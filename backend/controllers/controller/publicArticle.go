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
	var response entity.PostResponse
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
	count, err := PostCollection.CountDocuments(context.TODO(), bson.M{})
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		postList = append(postList, post)
		fmt.Println(post)
	}

	response.PostList = postList
	response.PostCount = int(count)
	ctx.JSON(http.StatusOK, response)
}

// GetPostTopicList トピックの記事を取得する
func GetPostTopicList(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var response entity.PostResponse
	articleCount := 12
	pageCount, err := strconv.Atoi(ctx.Query("page"))
	topic := ctx.Params.ByName("topic")
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

	cursor, _ := PostCollection.Find(context.TODO(), bson.M{"topic.iconName": topic}, &opts)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	count, _ := PostCollection.CountDocuments(context.TODO(), bson.M{"topic.iconName": topic})
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		postList = append(postList, post)
		fmt.Println(post)
	}
	response.PostList = postList
	response.PostCount = int(count)
	ctx.JSON(http.StatusOK, response)
}

// GetSearchList 検索された記事を取得する
func GetSearchList(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var response entity.PostResponse
	articleCount := 12
	pageCount, err := strconv.Atoi(ctx.Query("page"))
	query := ctx.Query("q")

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

	filter := bson.D{
		{"$or",
			bson.A{
				bson.M{"markdown": bson.M{"$regex": primitive.Regex{
					Pattern: "^" + query,
					Options: "i",
				}}},
				bson.M{"title": bson.M{"$regex": primitive.Regex{
					Pattern: "^" + query,
					Options: "i",
				}}},
				bson.M{"topic.iconName": bson.M{"$regex": primitive.Regex{
					Pattern: "^" + query,
					Options: "i",
				}}},
			}},
	}

	cursor, _ := PostCollection.Find(context.Background(), filter, &opts)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	count, _ := PostCollection.CountDocuments(context.TODO(), filter)
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		postList = append(postList, post)
		fmt.Println(post)
	}
	response.PostList = postList
	response.PostCount = int(count)
	ctx.JSON(http.StatusOK, response)
}
