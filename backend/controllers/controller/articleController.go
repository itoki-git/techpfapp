package controller

import (
	common "app/controllers/common"
	db "app/models/db"
	"app/models/entity"
	"context"
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var postCollection = db.ConnectPostsDB()

type PostFilter struct {
	LimitedPosts []entity.Post `json:"Posts"`
	LowerId      string        `json:"lowerId"`
}

// GetPost IDに紐づいた記事を１件取得する
func GetPost(ctx *gin.Context) {
	var post entity.Post
	postID := ctx.Params.ByName("id")
	id, _ := primitive.ObjectIDFromHex(postID)
	filter := bson.M{"_id": id}
	if err := postCollection.FindOne(context.TODO(), filter).Decode(&post); err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, post)
}

func CreatePost(ctx *gin.Context) {
	var post entity.Post
	_ = ctx.ShouldBindJSON(&post)
	post.Timestamp = time.Now()
	result, err := postCollection.InsertOne(context.TODO(), post)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

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

/*
// ユーザーが作成した記事を取得する
func GetPostsByUser(ctx *gin.Context) {
	var posts []entity.Post
	var user entity.User

	userID := ctx.Params.ByName("id")

}
*/
