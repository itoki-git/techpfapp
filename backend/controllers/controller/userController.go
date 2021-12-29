package controller

import (

	// Gin

	common "app/controllers/common"
	db "app/models/db"
	"app/models/entity"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"net/http"

	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"time"

	jwt "github.com/form3tech-oss/jwt-go"
)

// SecretKey jwtシークレットキー
const SecretKey = "secret"

// SignupUser ユーザを登録する
func SignupUser(ctx *gin.Context) {
	var register entity.User

	common.BindUser(&register, ctx)

	password, _ := bcrypt.GenerateFromPassword([]byte(register.Password), 14)
	user := entity.User{
		Name:     register.Name,
		Email:    register.Email,
		Password: string(password),
	}
	fmt.Println(user.Password, user.Name)
	if checkName := db.CheckNameDuplicate(&user, ""); checkName != 0 {
		fmt.Println("checkName")
		fmt.Println(checkName)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "name"})
		return
	} else if checkEmail := db.CheckEmailDuplicate(&user, ""); checkEmail != 0 {
		fmt.Println("checkEmail")
		fmt.Println(checkEmail)
		ctx.JSON(http.StatusMultipleChoices, gin.H{"message": "email"})
		return
	} else {
		fmt.Println("CREATE!!!!")
		// ユーザーを登録する
		user := db.CreateUser(&user)
		// 記事を保管するフォルダを作成する
		userID := strconv.Itoa(int(user.ID))
		registerPath := "../app/data/article/" + userID
		common.CreateFolder(registerPath)

		profilePath := "../app/data/profile/" + userID + ".json"

		// プロフィールをjsonに変換する
		jsonData, _ := json.Marshal("")
		// json書き込み
		if err := common.FileWrite(profilePath, string(jsonData)); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, user)
		return
	}

}

// Login ユーザーlogin処理
func Login(ctx *gin.Context) {
	var loginUser entity.EmailLogin
	//var profile entity.Profile

	common.BindEmailLogin(&loginUser, ctx)

	user := db.GetLoginUser(&loginUser)
	if user.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginUser.Password)); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "incorrect password"})
	} else {
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.ID)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})
		token, err := claims.SignedString([]byte(SecretKey))
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
		}
		//maxAge := time.Now().Add(time.Hour * 24)
		//ctx.SetCookie("jwt", token, 60*60*24, "/", "localhost", false, true)
		ctx.SetCookie("jwt", token, 60*60*24, "/", "localhost", false, true)
		ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email})
		/*
			if profile, err := GetProfileData(user.ProfilePath); err != nil {
				fmt.Println(err)
				ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
			} else {
				ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email,
					"shortProfile": profile.ShortProfile, "profile": profile.Profile})
			}
		*/
	}
}

// User jwtからユーザー情報を取得する
func User(ctx *gin.Context) {
	//var profile entity.Profile
	// cookieからuserIDを取得する
	userID := GetIDFromJwt(ctx)

	if user := db.GetUser(userID); user.Email != "" {
		fmt.Println(user.Email)
		ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email})
	} else {
		fmt.Println("err")
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
	}
	/*
		if profile, err := GetProfileData(user.ProfilePath); err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
		} else {
			ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email,
				"shortProfile": profile.ShortProfile, "profile": profile.Profile})
		}
	*/

}

// GetCreatorInformation 作成者の情報を取得する
func GetCreatorInformation(ctx *gin.Context) {
	var article entity.Article

	common.BindArticle(&article, ctx)

	//var profile entity.Profile

	userID := db.GetCreatorUserID(article.ArticleID)

	user := db.GetUser(userID.UserID)

	if profile, err := GetProfileData(user.ProfilePath); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
	} else {
		ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email,
			"shortProfile": profile.ShortProfile, "profile": profile.Profile})
	}

}

// Logout ログアウト
func Logout(ctx *gin.Context) {
	// cookieの削除
	ctx.SetCookie("jwt", "", -60*60*24, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

// UpdateAccount アカウント名、Emailの更新処理
func UpdateAccount(ctx *gin.Context) {
	var updateAccount entity.User
	//var profile entity.Profile

	common.BindUser(&updateAccount, ctx)

	// cookieからuserIDを取得する
	userID := GetIDFromJwt(ctx)

	// ユーザーネームの重複チェック
	if checkName := db.CheckNameDuplicate(&updateAccount, userID); checkName != 0 {
		fmt.Println("checkName")
		fmt.Println(checkName)
		ctx.JSON(http.StatusMultipleChoices, gin.H{"message": "name"})
		return
		// Emailの重複チェック
	} else if checkEmail := db.CheckEmailDuplicate(&updateAccount, userID); checkEmail != 0 {
		fmt.Println("checkEmail")
		fmt.Println(checkEmail)
		ctx.JSON(http.StatusMultipleChoices, gin.H{"message": "email"})
		return
		// ユーザー情報更新処理
	} else {
		fmt.Println("UPDATE!!!!")
		db.UpdateUser(userID, updateAccount.Name, updateAccount.Email)
		user := db.GetUser(userID)
		if profile, err := GetProfileData(user.ProfilePath); err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
		} else {
			ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "name": user.Name, "email": user.Email,
				"shortProfile": profile.ShortProfile, "profile": profile.Profile})
		}
	}
}

// UpdatePassword パスワードの更新処理
func UpdatePassword(ctx *gin.Context) {
	var updatePassord entity.UpdatePassword

	common.BindUpdatePassword(&updatePassord, ctx)

	// cookieからuserIDを取得する
	userID := GetIDFromJwt(ctx)
	// ユーザー情報を取得する
	user := db.GetUser(userID)

	if user.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(updatePassord.BeforePassword)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "password"})
	} else {
		// 新しいパスワードをハッシュ化
		password, _ := bcrypt.GenerateFromPassword([]byte(updatePassord.AfterPassword), 14)
		// パスワード更新処理
		db.UpdatePassword(strconv.Itoa(int(user.ID)), string(password))
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.ID)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})
		token, err := claims.SignedString([]byte(SecretKey))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": "could not login"})
		}
		//maxAge := time.Now().Add(time.Hour * 24)
		ctx.SetCookie("jwt", token, 60*60*24, "/", "localhost", false, true)
		ctx.JSON(http.StatusOK, gin.H{"messgae": "success"})
	}
}

// UpdateProfile プロフィール情報を登録&更新する
func UpdateProfile(ctx *gin.Context) {
	var profile entity.Profile
	user := GetAuthor(ctx)

	common.BindProfile(&profile, ctx)

	// jsonに書き込む内容
	profileData := map[string]interface{}{
		"ShortProfile": profile.ShortProfile,
		"Profile":      profile.Profile,
	}
	// プロフィールの保存場所
	userID := strconv.Itoa(int(user.ID))
	registerPath := "../app/data/profile/" + userID + ".json"

	// プロフィールをjsonに変換する
	jsonData, _ := json.Marshal(profileData)
	// json書き込み
	if err := common.FileWrite(registerPath, string(jsonData)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// プロフィールの保存場所をUserに登録する
	db.UpdateProfile(userID, registerPath)
	if profile, err := GetProfileData(user.ProfilePath); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "could not login"})
	} else {
		ctx.JSON(http.StatusOK, gin.H{"messgae": "success", "shortProfile": profile.ShortProfile, "profile": profile.Profile})
	}
}

// GetProfileData プロフィールの情報を取得する
func GetProfileData(profilePath string) (entity.Profile, error) {
	var profile entity.Profile

	if jsonFromFile, err := common.FileRead(profilePath); err != nil {
		return profile, err
	} else {
		if err := json.Unmarshal([]byte(jsonFromFile), &profile); err != nil {
			return profile, err
		}
	}
	return profile, nil
}

// RemoveAccount アカウントを削除する
func RemoveAccount(ctx *gin.Context) {
	// cookieからuserIDを取得する
	userID := GetIDFromJwt(ctx)
	// ユーザーと記事を削除する
	db.RemoveUser(userID)
	db.DeleteArticleAll(userID)
	// ユーザーが作成した記事を全て削除する
	removePath := "../app/data/article/" + userID
	common.RemoveFolder(removePath)
	// ユーザーのプロフィールデータを削除する
	removeProfile := "../app/data/profile/" + userID + ".json"
	common.RemoveFile(removeProfile)
	// cookieの削除
	ctx.SetCookie("jwt", "", -60*60*24, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

// GetIDFromJwt jwtからユーザーIDを取得する
func GetIDFromJwt(ctx *gin.Context) string {
	// cookieからuserIDを取得する
	cookie, _ := ctx.Cookie("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthenticated"})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	userID := claims.Issuer
	return userID
}

// Sample jwtからユーザーIDを取得する
func Sample(ctx *gin.Context) {
	fmt.Println("AAAA")
	ctx.JSON(http.StatusOK, gin.H{"message": "sample!!"})
}
