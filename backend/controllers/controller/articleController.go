package controller

import (
	db "app/models/db"
	"app/models/entity"
	"context"
	"net/http"
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

/*
// ユーザーが作成した記事を取得する
func GetPostsByUser(ctx *gin.Context) {
	var posts []entity.Post
	var user entity.User

	userID := ctx.Params.ByName("id")

}
*/
