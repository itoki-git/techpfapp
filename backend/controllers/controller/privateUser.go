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

	"github.com/form3tech-oss/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"net/http"
	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
)

// ContainsKey entityのキーと入力した配列の要素のチェックを行う
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

func CheckUserLogin(ctx *gin.Context) {
	var user entity.User
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loadinga .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")
	cookie, err := ctx.Cookie("jwt")
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
	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func GetProfile(ctx *gin.Context) {
	var profile entity.User
	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"_id": id}

	fmt.Println(filter)

	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&profile); err != nil {
		db.GetError(err, ctx)
		return
	}
	profile.Password = ""
	ctx.JSON(http.StatusOK, profile)
	return

}

func UpdateProfile(ctx *gin.Context) {
	var user entity.User
	var updateUser entity.User
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loadinga .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")
	cookie, err := ctx.Cookie("jwt")
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
	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}
	// プロフィール情報のアップデート
	ctx.ShouldBindJSON(&updateUser)
	fmt.Println(updateUser)
	update := bson.M{"nickname": updateUser.NickName, "jobname": updateUser.JobName, "bio": updateUser.Bio, "image": updateUser.Image, "skill": updateUser.Skills}
	result, err := UserCollection.UpdateMany(context.TODO(), filter, bson.M{"$set": update})
	if err != nil {
		fmt.Println(err)
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)

}
