package controller

import (

	// Gin

	db "app/models/db"
	"app/models/entity"
	"context"
	"fmt"
	"reflect"

	"github.com/gin-gonic/gin"
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
	fmt.Println(target)
	if reflect.DeepEqual(check, target) {
		return true
	}
	return false
}

// CreateUser ユーザーの新規登録
func CreateUser(ctx *gin.Context) {
	var user entity.User
	var checkKey = []string{"Name", "Email", "Password"}
	ignore := []string{"ID"}
	_ = ctx.ShouldBindJSON(&user)

	if containsString := ContainsKey(checkKey, user, ignore); !containsString {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error Request does not have the required fields. "})
		return
	}
	// パスワードを暗号化
	password, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	user.Password = string(password)

	fmt.Println(user.Password)

	result, err := userCollection.InsertOne(context.TODO(), user)
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
	ctx.JSON(http.StatusOK, user)
}

/*
// LoginUser ユーザー認証を行う
func LoginUser(ctx *gin.Context) {
	var login entity.User
	var user entity.User
	var checkKey = []string{"Email", "Password"}
	ignore := []string{"ID", "Name"}
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")

	_ = ctx.ShouldBindJSON(&login)
	if containsString := ContainsKey(checkKey, login, ignore); !containsString {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error Request does not have the required fields. "})
		return
	}
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"_id": id}
	if err := userCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}

	ctx.JSON(http.StatusOK, user)
}
*/
