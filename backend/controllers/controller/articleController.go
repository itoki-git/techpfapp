package controller

import (
	"encoding/json"
	"fmt"
	"strconv"

	// Gin
	"github.com/gin-gonic/gin"
	// エンティティ(DBのテーブルの行に対応)

	// DBアクセス用モジュール
	common "app/controllers/common"
	db "app/models/db"
	"app/models/entity"
	"math/rand"
	"net/http"
	"time"

	"github.com/oklog/ulid"
)

// ポートフォリオの状態を定義
const (
	// post は投稿
	post = 0
	// edit は保存
	edit = 1
	// limitedPublishing は限定公開
	limitedPublishing = 2
)

// DateFormat 日付のフォーマット
const DateFormat = "2006/01/02"

// GetAllArticle は、全ての記事を取得する
func GetAllArticle(ctx *gin.Context) {
	var postData entity.PostData
	var posts entity.Posts
	result := db.FindAllArticle()
	for i := 0; i < len(result); i++ {
		postData = GetArticle(result[i].ArticleID)
		posts = append(posts, postData)
	}
	// アクセスに対してJSONを返す
	ctx.JSON(http.StatusOK, posts)
}

// GetSpecifiedArticle は、指定したIDの記事を取得する
func GetSpecifiedArticle(ctx *gin.Context) {
	var postData entity.PostData
	var singlePostData entity.Article

	common.BindArticle(&singlePostData, ctx)

	postData = GetArticle(singlePostData.ArticleID)
	// アクセスに対してJSONを返す
	ctx.JSON(http.StatusOK, postData)
}

// GetUserArticle ユーザーごとの記事を取得する
func GetUserArticle(ctx *gin.Context) {
	var postData entity.PostData
	var posts entity.Posts
	userID := GetIDFromJwt(ctx)
	result := db.FindUserArticle(userID)

	for i := 0; i < len(result); i++ {
		postData = GetArticle(result[i].ArticleID)
		posts = append(posts, postData)
	}
	ctx.JSON(http.StatusOK, posts)
}

// GetArticle 記事IDで指定された記事を取得する
func GetArticle(articleID string) entity.PostData {
	var postData entity.PostData
	result := db.FindArticle(articleID)
	if jsonFromFile, err := common.FileRead(result.Data); err != nil {
		//ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		if err := json.Unmarshal([]byte(jsonFromFile), &postData); err != nil {
			//ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
	author := db.GetUser(result.UserID)
	// 記事の情報を詰める
	article := entity.PostData{
		ArticleID:   result.ArticleID,
		CreatedAt:   result.CreatedAt.Format(DateFormat),
		Author:      author.Name,
		Title:       postData.Title,
		Description: postData.Description,
		Article:     postData.Article,
		Topics:      postData.Topics,
	}
	return article
}

// RegisterArticle は、記事をDBへ登録する
func RegisterArticle(ctx *gin.Context) {
	user := GetAuthor(ctx)
	var formJSON entity.ArticleData

	common.BindArticleData(&formJSON, ctx)
	// ArticleIDのID生成
	registrationTime := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(registrationTime.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(registrationTime), entropy)

	fmt.Println(formJSON.Article)

	// jsonに書き込む内容
	articleData := map[string]interface{}{
		"ArticleID":   id.String(),
		"userID":      user.ID,
		"Title":       formJSON.Title,
		"Description": formJSON.Description,
		"Article":     formJSON.Article,
		"Topics":      formJSON.Topics,
	}
	// 記事の保管場所
	userID := strconv.Itoa(int(user.ID))
	registerPath := "../app/data/article/" + userID + "/" + id.String() + ".json"
	article := entity.Article{
		ArticleID: id.String(),
		UserID:    userID,
		Data:      registerPath,
	}
	// jsonに変換
	jsonData, _ := json.Marshal(articleData)
	// json書き込み
	if err := common.FileWrite(registerPath, string(jsonData)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.InsertArticle(&article)
}

// UpadateArticle は、記事をアップデートしDBへ再登録する
func UpadateArticle(ctx *gin.Context) {
	user := GetAuthor(ctx)
	var formJSON entity.UpdateArticle

	common.BindUpdateArticle(&formJSON, ctx)

	// jsonに書き込む内容
	articleData := map[string]interface{}{
		"ArticleID":   formJSON.ArticleID,
		"userID":      user.ID,
		"Title":       formJSON.ArticleData.Title,
		"Description": formJSON.ArticleData.Description,
		"Article":     formJSON.ArticleData.Article,
		"Topics":      formJSON.ArticleData.Topics,
	}
	// 記事の保管場所
	userID := strconv.Itoa(int(user.ID))
	registerPath := "../app/data/article/" + userID + "/" + formJSON.ArticleID + ".json"
	// jsonに変換
	jsonData, _ := json.Marshal(articleData)
	// json書き込み
	if err := common.FileWrite(registerPath, string(jsonData)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// RemoveArticle 記事を削除する
func RemoveArticle(ctx *gin.Context) {
	var article entity.Article
	common.BindArticle(&article, ctx)
	// 記事IDからremoveArticlePathに必要なユーザーIDを取得する
	author := db.FindArticle(article.ArticleID)
	// 記事IDでDBから削除する
	db.DeleteTargetArticle(article.ArticleID)
	// 記事を削除する
	removeArticle := "../app/data/article/" + author.UserID + "/" + article.ArticleID + ".json"
	common.RemoveFile(removeArticle)

	ctx.JSON(http.StatusOK, gin.H{"message": "success"})

}

// GetAuthor cookieの情報から作者を取得する
func GetAuthor(ctx *gin.Context) entity.User {
	userID := GetIDFromJwt(ctx)

	user := db.GetUser(userID)
	return user
}
