package controller

import (
	db "app/models/db"
	"app/models/entity"
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetPost IDに紐づいた記事を１件取得する
func GetPost(ctx *gin.Context) {
	var post entity.Article
	postID := ctx.Params.ByName("id")
	id, _ := primitive.ObjectIDFromHex(postID)
	filter := bson.M{"articleID": id}
	if err := PostCollection.FindOne(context.TODO(), filter).Decode(&post); err != nil {
		db.GetError(err, ctx)
		return
	}
	ctx.JSON(http.StatusOK, post)
}

// GetPostList ページ単位で記事を取得する
func GetPostList(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	articleCount := 12
	pageCount, err := strconv.Atoi(ctx.Query("page"))
	fmt.Println(pageCount)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "error get page failed. "})
		return
	}
	skip := int64(pageCount*articleCount - articleCount)
	limit := int64(pageCount * articleCount)
	opts := options.FindOptions{
		Skip:  &skip,
		Limit: &limit,
	}
	cursor, err := PostCollection.Find(context.TODO(), bson.M{}, &opts)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		postList = append(postList, post)
		fmt.Println(post)
	}
	ctx.JSON(http.StatusOK, postList)
}
