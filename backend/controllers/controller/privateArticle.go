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
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CreatePost 記事を作成・登録
func CreatePost(ctx *gin.Context) {
	var post entity.Article
	var user entity.User
	var like entity.Like

	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
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
	// 記事のLikeドキュメントを作成
	like.ArticleID = post.ArticleID
	like.Users = []entity.LikeUser{}
	if _, err := LikeCollection.InsertOne(context.TODO(), like); err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// GetUserPost MyPageの記事を取得する
func GetPrivateUserPost(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var response entity.PostResponse

	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"authorID": id}

	cursor, err := PostCollection.Find(context.TODO(), filter)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	count, err := PostCollection.CountDocuments(context.TODO(), bson.M{})
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		postList = append(postList, post)
	}

	response.PostList = postList
	response.PostCount = int(count)
	fmt.Println(response)
	ctx.JSON(http.StatusOK, response)
}

// GetUserPost 登録ユーザーのいいねした記事を取得する
func GetUserLikePost(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var user entity.User
	var response entity.PostResponse

	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"_id": id}

	if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		db.GetError(err, ctx)
		return
	}

	for _, value := range user.Like {
		if err := PostCollection.FindOne(context.TODO(), bson.M{"articleID": value}).Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		postList = append(postList, post)
	}
	response.PostList = postList
	response.PostCount = len(postList)
	fmt.Println(response)
	ctx.JSON(http.StatusOK, response)
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
