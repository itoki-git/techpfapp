package common

import (
	"app/models/entity"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// BindArticle ArticleエンティティのJSONをBindする
func BindArticle(article *entity.Article, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&article); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// BindArticleData ArticleDataエンティティのJSONをBindする
func BindArticleData(articleData *entity.ArticleData, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&articleData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// BindUpdateArticle 記事アップデート用のJSONをBindする
func BindUpdateArticle(articleData *entity.UpdateArticle, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&articleData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// BindUser UserエンティティのJSONをBindする
func BindUser(user *entity.User, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&user); err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
}

// BindEmailLogin EmailLoginエンティティのJSONをBindする
func BindEmailLogin(loginUser *entity.EmailLogin, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&loginUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// BindUpdatePassword UpdatePasswordエンティティのJSONをBindする
func BindUpdatePassword(password *entity.UpdatePassword, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// BindProfile ProfileエンティティのJSONをBindする
func BindProfile(profile *entity.Profile, ctx *gin.Context) {
	if err := ctx.ShouldBindJSON(&profile); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}
