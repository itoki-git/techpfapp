package controller

import (
	"app/models/db"
	"app/models/entity"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UpdateLike Likeを押したら更新する
func UpdateLike(ctx *gin.Context) {
	var like entity.LikeUser
	var user entity.LikeUser
	var result bool
	getPostID := ctx.Params.ByName("id")
	getUserID := ctx.GetString("userID")
	userID, _ := primitive.ObjectIDFromHex(getUserID)
	postID, _ := primitive.ObjectIDFromHex(getPostID)
	checkFilter := bson.M{"articleID": postID, "users.userID": userID}
	filter := bson.M{"articleID": postID}

	// LIKEテーブルに存在するかチェック
	isErr := LikeCollection.FindOne(context.TODO(), checkFilter).Decode(&user)

	like.UserID = userID
	like.Timestamp = time.Now()

	update := bson.M{"users": like}

	if isErr == nil {
		// 記事のいいねを削除する
		if _, err := LikeCollection.UpdateOne(context.TODO(), filter, bson.M{"$pull": bson.M{"users": bson.M{"userID": userID}}}); err != nil {
			db.GetError(err, ctx)
			return
		}
		// ユーザープロフィールのいいねを削除する
		if _, err := UserCollection.UpdateOne(context.TODO(), bson.M{"userID": userID}, bson.M{"$pull": bson.M{"like": postID}}); err != nil {
			db.GetError(err, ctx)
			return
		}
		result = false
	} else {
		// 記事のいいねに追加する
		if _, err := LikeCollection.UpdateOne(context.TODO(), filter, bson.M{"$push": update}); err != nil {
			db.GetError(err, ctx)
			return
		}
		if _, err := UserCollection.UpdateOne(context.TODO(), bson.M{"userID": userID}, bson.M{"$push": bson.M{"like": postID}}); err != nil {
			db.GetError(err, ctx)
			return
		}
		result = true
	}
	ctx.JSON(http.StatusOK, gin.H{"liked": result})
}

// GetPostIsLike 記事にLikeを押しているかを返却する
func GetPostIsLike(ctx *gin.Context) {
	getPostID := ctx.Params.ByName("id")
	getUserID := ctx.GetString("userID")
	userID, _ := primitive.ObjectIDFromHex(getUserID)
	postID, _ := primitive.ObjectIDFromHex(getPostID)
	filter := bson.M{"articleID": postID, "users.userID": userID}

	count, err := LikeCollection.CountDocuments(context.TODO(), filter)
	if err != nil {
		db.GetError(err, ctx)
		return
	}
	if count != 0 {
		ctx.JSON(http.StatusOK, gin.H{"liked": true})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"liked": false})
	return
}

// GetCountLike 記事にいいねされている数を返却する
func GetCountLike(postID primitive.ObjectID) int {
	var like entity.Like
	filter := bson.M{"articleID": postID}
	if err := LikeCollection.FindOne(context.TODO(), filter).Decode(&like); err != nil {
		return 0
	}
	return len(like.Users)
}
