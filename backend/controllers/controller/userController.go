package controller

import (

	// Gin

	db "app/models/db"
	"app/models/entity"
	"context"
	"fmt"
	"log"
	"os"
	"reflect"
	"time"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"

	"net/http"
	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
)

// SecretKey jwtシークレットキー
const SecretKey = "secret"

var userCollection = db.ConnectUsersDB()

// Contains entityのキーと入力した配列の要素のチェックを行う
func ContainsKey(check []string, elem interface{}, ignore []string) bool {
	var target []string
	// isIgnore 無視対象の文字があるかのフラグ
	isIgnore := false

	targetValue := reflect.TypeOf(elem)
	targetType := reflect.TypeOf(elem)
	for i := 0; i < targetValue.NumField(); i++ {
		field := targetType.Field(i)
		for _, key := range ignore {
			if field.Name == key {
				isIgnore = true
			}
		}
		if !isIgnore {
			target = append(target, field.Name)
		}
		isIgnore = false
	}
	return reflect.DeepEqual(check, target)
}

// CreateUser ユーザーの新規登録
func CreateUser(ctx *gin.Context) {
	var user entity.CreateUser
	var checkKey = []string{"Name", "Email", "Password"}
	ignore := []string{"ID", "JobName", "Bio", "Image", "Skills", "Article", "Like", "WatchLater"}
	ctx.ShouldBindJSON(&user)

	if containsString := ContainsKey(checkKey, user, ignore); !containsString {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error Request does not have the required fields. "})
		return
	}
	// パスワードを暗号化
	password, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	// 初期値を入力
	register := entity.User{
		ID:         primitive.NewObjectID(),
		Name:       user.Name,
		Email:      user.Email,
		Password:   string(password),
		JobName:    "",
		Bio:        "",
		Image:      "",
		Skills:     []string{},
		Article:    []primitive.ObjectID{},
		Like:       []primitive.ObjectID{},
		WatchLater: []primitive.ObjectID{},
	}
	fmt.Println(register)
	result, err := userCollection.InsertOne(context.TODO(), register)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// GetUser ユーザー情報を1件取得する
func GetUser(ctx *gin.Context) {
	var user entity.User
	// URLからIDを取得する
	userID := ctx.Params.ByName("id")
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"_id": id}
	if err := userCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	// レスポンス設定
	response := entity.User{
		Name:       user.Name,
		JobName:    user.JobName,
		Bio:        user.Bio,
		Image:      user.Image,
		Skills:     user.Skills,
		Article:    user.Article,
		Like:       user.Like,
		WatchLater: user.WatchLater,
	}
	ctx.JSON(http.StatusOK, response)
}

// LoginUser ユーザー認証を行う
func LoginUser(ctx *gin.Context) {
	var login entity.LoginUser
	var user entity.User
	var checkKey = []string{"Email", "Password"}
	ignore := []string{"ID", "Name", "JobTitle", "Bio", "Image", "Article"}
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")

	ctx.ShouldBindJSON(&login)
	if containsString := ContainsKey(checkKey, login, ignore); !containsString {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error Request does not have the required fields. "})
		return
	}
	filter := bson.M{"email": login.Email}
	if err := userCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password)); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
	} else {
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    user.ID.Hex(),
			IssuedAt:  time.Now().Unix(),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})
		// 生成と検証を内部で行うため、secretを使用する
		token, err := claims.SignedString([]byte(secretKey))
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
		}
		ctx.SetCookie("status", token, 60*60*24, "/", "localhost", false, true)
		// レスポンス設定
		response := entity.User{
			Name:       user.Name,
			Email:      user.Email,
			JobName:    user.JobName,
			Bio:        user.Bio,
			Image:      user.Image,
			Skills:     user.Skills,
			Article:    user.Article,
			Like:       user.Like,
			WatchLater: user.WatchLater,
		}
		ctx.JSON(http.StatusOK, response)
	}
}

func CheckUserLogin(ctx *gin.Context) {
	var user entity.User
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")
	cookie, err := ctx.Cookie("status")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
		return
	}
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
		return
	}
	claims := token.Claims.(*jwt.StandardClaims)
	id, err := primitive.ObjectIDFromHex(claims.Issuer)
	filter := bson.M{"_id": id}
	if err := userCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	// レスポンス設定
	response := entity.User{
		Name:       user.Name,
		Email:      user.Email,
		JobName:    user.JobName,
		Bio:        user.Bio,
		Image:      user.Image,
		Skills:     user.Skills,
		Article:    user.Article,
		Like:       user.Like,
		WatchLater: user.WatchLater,
	}
	ctx.JSON(http.StatusOK, response)
}

func UpdateProfile(ctx *gin.Context) {
	var user entity.User
	var updateUser entity.User
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")
	cookie, err := ctx.Cookie("status")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
		return
	}
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error Authentication failed. "})
		return
	}
	claims := token.Claims.(*jwt.StandardClaims)
	id, err := primitive.ObjectIDFromHex(claims.Issuer)
	filter := bson.M{"_id": id}
	if err := userCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	// プロフィール情報のアップデート
	ctx.ShouldBindJSON(&updateUser)
	fmt.Println(updateUser)
	update := bson.M{"name": updateUser.Name, "jobname": updateUser.JobName, "bio": updateUser.Bio, "image": updateUser.Image, "skill": updateUser.Skills}
	result, err := userCollection.UpdateMany(context.TODO(), filter, bson.M{"$set": update})
	if err != nil {
		fmt.Println(err)
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)

}
