package entity

import (
	"github.com/jinzhu/gorm"
)

// Article は記事のデータ
type Article struct {
	gorm.Model
	ArticleID string `json:"articleID"`
	UserID    string `json:"userID"`
	Data      string `json:"data"`
}

// ArticleData は記事の中身(データ)
type ArticleData struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Article     []Data
	Topics      []string `json:"topics"`
}

// Data Aritleのmarp,cssの情報
type Data struct {
	Marp string `json:"marp"`
	CSS  string `json:"css"`
}

// UpdateArticle 記事更新用のエンティティ
type UpdateArticle struct {
	gorm.Model
	ArticleID   string `json:"articleID"`
	ArticleData ArticleData
}

// Posts Postで送信するデータ
type Posts []PostData

// PostData POSTするデータの中身
type PostData struct {
	ArticleID   string `json:"articleID"`
	CreatedAt   string `json:"created_at"`
	Author      string `json:"author"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Article     []Data
	Topics      []string `json:"topics"`
}
