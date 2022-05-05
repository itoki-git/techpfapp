package controller

import (
	db "app/models/db"
	"app/models/entity"
	"context"
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
	var user entity.User
	postID := ctx.Params.ByName("id")
	id, _ := primitive.ObjectIDFromHex(postID)
	filter := bson.M{"articleID": id}
	if err := PostCollection.FindOne(context.TODO(), filter).Decode(&post); err != nil {
		db.GetError(err, ctx)
		return
	}
	filter = bson.M{"_id": post.AuthorID}
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
	}
	post.User = response

	ctx.JSON(http.StatusOK, post)
}

// GetUserPost 登録ユーザーの記事を取得する
func GetUserPost(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var user entity.PostUser
	var response entity.PostResponse
	userID := ctx.Params.ByName("id")
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
		filter := bson.M{"_id": post.AuthorID}
		if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		post.User = user
		postList = append(postList, post)
	}

	response.PostList = postList
	response.PostCount = int(count)
	ctx.JSON(http.StatusOK, response)
}

// GetPostList ページ単位で記事を取得する
func GetPostList(ctx *gin.Context) {
	postList := []entity.Post{}
	var post entity.Post
	var user entity.PostUser
	var response entity.PostResponse
	articleCount := 12
	pageCount, err := strconv.Atoi(ctx.Query("page"))
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

	count, _ := PostCollection.CountDocuments(context.TODO(), bson.M{})
	response.PostCount = int(count)

	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		filter := bson.M{"_id": post.AuthorID}
		if err := UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		post.User = user
		postList = append(postList, post)
	}

	response.PostList = postList

	ctx.JSON(http.StatusOK, response)
}

// GetPostTopicList トピックの記事を取得する
func GetPostTopicList(ctx *gin.Context) {
	postList := []entity.Post{}
	var user entity.PostUser
	var post entity.Post
	var response entity.PostResponse
	articleCount := 12
	pageCount, err := strconv.Atoi(ctx.Query("page"))
	topic := ctx.Params.ByName("topic")

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
	response.PostCount = int(count)

	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		if err := UserCollection.FindOne(context.TODO(), bson.M{"_id": post.AuthorID}).Decode(&user); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		post.User = user
		postList = append(postList, post)
	}
	response.PostList = postList

	ctx.JSON(http.StatusOK, response)
}

// GetSearchList 検索された記事を取得する
func GetSearchList(ctx *gin.Context) {
	postList := []entity.Post{}
	var user entity.PostUser
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
					Pattern: query,
					Options: "i",
				}}},
				bson.M{"title": bson.M{"$regex": primitive.Regex{
					Pattern: query,
					Options: "i",
				}}},
				bson.M{"topic.iconName": bson.M{"$regex": primitive.Regex{
					Pattern: query,
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
	response.PostCount = int(count)

	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&post); err != nil {
			db.GetError(err, ctx)
			return
		}
		if err := UserCollection.FindOne(context.TODO(), bson.M{"_id": post.AuthorID}).Decode(&user); err != nil {
			db.GetError(err, ctx)
			return
		}
		post.Like = GetCountLike(post.ArticleID)
		post.User = user
		postList = append(postList, post)
	}
	response.PostList = postList

	ctx.JSON(http.StatusOK, response)
}
