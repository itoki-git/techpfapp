package db

import (
	entity "github.com/itoki-git/tripApp/backend/models/entity"

	"github.com/jinzhu/gorm"
)

// DB接続
func articleOpen() *gorm.DB {
	DBMS := "mysql"
	USER := "admin"
	PASS := "admin123"
	PROTOCOL := "tcp(mysql_container:3306)"
	DBNAME := "Portfolio"
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?parseTime=true"
	db, err := gorm.Open(DBMS, CONNECT)

	if err != nil {
		panic(err.Error())
	}
	// DBエンジンをInnoDBに設定
	db.Set("gorm:table_options", "ENGINE=InnoDB")

	// ログを表示
	db.LogMode(true)

	// テーブル名を単数形にする
	db.SingularTable(true)

	// マイグレーション
	db.AutoMigrate(&entity.Article{})
	return db
}

// InsertArticle DB追加
func InsertArticle(registerArticle *entity.Article) {
	db := articleOpen()
	// insert
	db.Create(&registerArticle)
	defer db.Close()
}

// FindAllArticle articleテーブルのレコードを全件取得する
func FindAllArticle() []entity.Article {
	articles := []entity.Article{}

	db := articleOpen()
	// select * from article
	db.Find(&articles)
	defer db.Close()

	return articles
}

// FindUserArticle ユーザーごとの記事を取得する
func FindUserArticle(userID string) []entity.Article {
	articles := []entity.Article{}

	db := articleOpen()
	// select * from article where user_id = ?
	db.Where("user_id = ?", userID).Find(&articles)
	defer db.Close()

	return articles
}

// FindArticle １件だけ探す
func FindArticle(articleID string) entity.Article {
	article := entity.Article{}

	db := articleOpen()
	// select * from article where article_id = ?
	db.Where("article_id = ?", articleID).First(&article)
	defer db.Close()

	return article
}

// DeleteArticleAll 記事を全て削除する
func DeleteArticleAll(userID string) {
	article := entity.Article{}

	db := articleOpen()
	// delete from article where user_id = ?
	db.Where("user_id = ?", userID).Delete(&article)
	defer db.Close()
}

// DeleteTargetArticle 対象記事を削除する
func DeleteTargetArticle(articleID string) {
	article := entity.Article{}

	db := articleOpen()
	// delete from article where article_id = ?
	db.Where("article_id = ?", articleID).Unscoped().Delete(&article)
	defer db.Close()
}

// GetCreatorUserID 記事IDから作成者の情報を取得する
func GetCreatorUserID(articleID string) entity.Article {
	db := articleOpen()
	creator := entity.Article{}
	// 初めに見つかったユーザー情報を取得する
	// select * from article where article_id = ?
	db.Where("article_id = ?", articleID).First(&creator)
	defer db.Close()
	return creator
}
