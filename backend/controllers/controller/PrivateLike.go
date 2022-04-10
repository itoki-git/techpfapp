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

func UpdateLike(ctx *gin.Context) {
	var like entity.LikeUser
	var result bool
	postID := ctx.Params.ByName("id")
	userID := ctx.GetString("userID")
	id, _ := primitive.ObjectIDFromHex(userID)
	checkFilter := bson.M{"articleID": postID, "users._id": id}
	filter := bson.M{"articleID": postID}
	update := bson.M{"users._id": id}
	// LIKEテーブルに存在するかチェック
	isErr := LikeCollection.FindOne(context.TODO(), checkFilter)

	like.UserID = id
	like.Timestamp = time.Now()

	if isErr != nil {
		_, err := LikeCollection.UpdateOne(context.TODO(), filter, bson.M{"$set": update})
		if err != nil {
			db.GetError(err, ctx)
			return
		}
		result = true
	} else {
		if _, err := LikeCollection.DeleteOne(context.TODO(), checkFilter); err != nil {
			db.GetError(err, ctx)
			return
		}
		result = false
	}
	ctx.JSON(http.StatusOK, gin.H{"liked": result})
}
