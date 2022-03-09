package controller

import (
	common "app/controllers/common"
	db "app/models/db"
	"app/models/entity"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CreatePost 記事を作成・登録
func CreatePost(ctx *gin.Context) {
	var post entity.Article
	var user entity.User
	// cookieからユーザーIDを取得する
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
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
	_ = ctx.ShouldBindJSON(&post)
	post.ArticleID = primitive.NewObjectID()
	post.AuthorID = user.ID
	post.Timestamp = time.Now()
	result, err := PostCollection.InsertOne(context.TODO(), post)
	if err != nil {
		db.GetError(err, ctx)
		return
	}

	// User情報に記事のIDを追加(アップデート)
	update := bson.D{primitive.E{Key: "$push", Value: bson.D{
		primitive.E{Key: "article", Value: result.InsertedID},
	}}}
	opts := options.Update().SetUpsert(true)
	_, updateErr := UserCollection.UpdateOne(context.TODO(), filter, update, opts)
	if updateErr != nil {
		db.GetError(updateErr, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// UploadImage 画像をS3にアップロードするURLを生成
func UploadImage(ctx *gin.Context) {
	var file entity.Image
	ctx.ShouldBindJSON(&file)
	ext := filepath.Ext(file.FileName)
	fileName, err := common.GetUUID()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "error S3 upload failed. "})
		return
	}
	fileName += ext
	fmt.Println(fileName)
	preID, err := common.S3("/test/", fileName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "error S3 upload failed. "})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"s3url": preID})
}
