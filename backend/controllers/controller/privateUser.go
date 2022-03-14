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

func Logout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", -60*60*24, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
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
	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
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
