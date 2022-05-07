package controller

import (

	// Gin

	"app/auth"
	db "app/models/db"
	"app/models/entity"
	"context"
	"os"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"

	"net/http"
	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
)

var PostCollection = db.ConnectPostsDB()
var UserCollection = db.ConnectUsersDB()
var LikeCollection = db.ConnectLikesDB()

type LoginResponse struct {
	Token string `json:"token"`
}

// CreateUser ユーザーの新規登録
func CreateUser(ctx *gin.Context) {
	var user entity.User

	//var checkKey = []string{"NickName", "UserName", "Password"}
	//ignore := []string{"ID", "JobName", "Bio", "Image", "Skills", "Article", "Like", "WatchLater"}
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"msg": "invalid json",
		})
		ctx.Abort()
		return
	}

	if count, _ := UserCollection.CountDocuments(context.TODO(), bson.M{"username": user.UserName}); count > 0 {
		ctx.JSON(http.StatusConflict, gin.H{
			"msg": "username conflict",
		})
		ctx.Abort()
		return
	}

	// パスワードを暗号化
	err = user.HashPassword(user.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "error hashing password"})
		ctx.Abort()
		return
	}
	err = user.CreateUserRecord()

	if err != nil {
		db.GetError(err, ctx)
		ctx.Abort()
		return
	}
	user.Password = ""
	ctx.JSON(http.StatusOK, user)
}

// GetUser ユーザー情報を1件取得する
func GetUser(ctx *gin.Context) {
	var user entity.User
	// URLからIDを取得する
	userName := ctx.Params.ByName("id")
	filter := bson.M{"username": userName}
	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	// レスポンス設定
	response := entity.User{
		ID:       user.ID,
		NickName: user.NickName,
		UserName: user.UserName,
		JobName:  user.JobName,
		Bio:      user.Bio,
		Image:    user.Image,
		Skills:   user.Skills,
		Article:  user.Article,
		Like:     user.Like,
	}
	ctx.JSON(http.StatusOK, response)
}

// LoginUser ユーザー認証を行う
func LoginUser(ctx *gin.Context) {
	var login entity.LoginPayload
	var user entity.User

	// Secret Keyの取得
	secretKey := os.Getenv("SECRET_KEY")
	Issuer := os.Getenv("Issuer")

	err := ctx.ShouldBindJSON(&login)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid json"})
		ctx.Abort()
		return
	}
	filter := bson.M{"username": login.UserName}
	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	err = user.CheckPassword(login.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "invalid user credentials"})
		ctx.Abort()
		return
	}

	jwtWrapper := auth.JwtWrapper{
		SecretKey:       secretKey,
		Issuer:          Issuer,
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.ID.Hex())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "error signed token"})
		ctx.Abort()
		return
	}
	ctx.SetCookie("jwt", signedToken, 60*60*24, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, user)
	return
}
