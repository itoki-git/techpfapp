package db

import (
	entity "github.com/itoki-git/tripApp/backend/models/entity"

	"github.com/jinzhu/gorm"
)

// DB接続
func userOpen() *gorm.DB {
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
	db.AutoMigrate(&entity.User{})
	return db
}

// CreateUser はユーザの登録
func CreateUser(registerUser *entity.User) *entity.User {
	db := userOpen()
	// insert
	db.Create(&registerUser)
	defer db.Close()
	return registerUser
}

// GetLoginUser ログイン時ユーザを１件取得
func GetLoginUser(login *entity.EmailLogin) entity.User {
	db := userOpen()
	var user entity.User
	db.Where("email = ?", login.Email).First(&user)
	defer db.Close()
	return user
}

// CheckNameDuplicate DB登録時の重複をチェックする
func CheckNameDuplicate(name *entity.User, id string) int {
	db := userOpen()
	var count = 0
	var user entity.User
	// ユーザー自身のIDを除いて重複をチェックすする
	db.Not("id = ?", id).Where("name = ?", name.Name).First(&user).Count(&count)
	if count == 0 {
		return 0
	}
	defer db.Close()
	return 1
}

// CheckEmailDuplicate DB登録時の重複をチェックする
func CheckEmailDuplicate(email *entity.User, id string) int {
	db := userOpen()
	var count = 0
	var user entity.User
	// ユーザー自身のIDを除いて重複をチェックすする
	db.Not("id = ?", id).Where("email = ?", email.Email).First(&user).Count(&count)
	if count == 0 {
		return 0
	}
	defer db.Close()
	return 1
}

// GetUser ログイン時ユーザを１件取得
func GetUser(id string) entity.User {
	db := userOpen()
	var user entity.User
	// 初めに見つかったユーザー情報を取得する
	db.Where("id = ?", id).First(&user)
	defer db.Close()
	return user
}

// UpdateUser Userテーブル更新
func UpdateUser(id string, name string, email string) {
	var user entity.User

	db := userOpen()
	// update
	db.Model(&user).Where("id = ?", id).Updates(map[string]interface{}{"name": name, "email": email})
	defer db.Close()
}

// UpdatePassword Userテーブルのパスワードの更新
func UpdatePassword(id string, password string) {
	var user entity.User

	db := userOpen()
	// update パスワードを保存する
	db.Model(&user).Where("id = ?", id).Updates(map[string]interface{}{"password": password})
	defer db.Close()
}

// UpdateProfile Userのプロフィールを追加または更新する
func UpdateProfile(id string, profilePath string) {
	var user entity.User

	db := userOpen()
	// update プロフィールが保存されているパスを保存する
	db.Model(&user).Where("id = ?", id).Update(map[string]interface{}{"profilePath": profilePath})
	defer db.Close()
}

// RemoveUser Userテーブルからユーザーを削除
func RemoveUser(id string) {
	db := userOpen()

	// DELETE FROM user WHERE id = ?;
	db.Where("id = ?", id).Unscoped().Delete(&entity.User{})
	defer db.Close()
}
