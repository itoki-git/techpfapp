package db

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	// 接続先のDB情報を入力
	dbname  = "portfolioapp"
	colname = "user"
)

// ErrorResponse エラーレスポンスの定義
type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

func ConnectUsersDB() *mongo.Collection {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	// 指定したURIに接続する
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to Users Collection. ")

	collection := client.Database(dbname).Collection("users")

	return collection
}

func ConnectPostsDB() *mongo.Collection {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	// 指定したURIに接続する
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to Posts Collection. ")

	collection := client.Database(dbname).Collection("posts")

	return collection
}

// GetError エラーを返却する
func GetError(err error, ctx *gin.Context) {
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)
	ctx.JSON(response.StatusCode, message)
}
