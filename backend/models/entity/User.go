package entity

import (
	"github.com/jinzhu/gorm"
)

// User ユーザ情報のカラム
type User struct {
	gorm.Model
	Name        string `json:"name" gorm:"unique;not null"`
	Email       string `json:"email" gorm:"unique;not null"`
	Password    string `json:"password" gorm:"not null"`
	ProfilePath string `json:"profilePath"`
}

// Profile ユーザーのプロフィール
type Profile struct {
	gorm.Model
	ShortProfile string `json:"shortProfile"`
	Profile      string `json:"profile"`
}

// EmailLogin メールアドレスログイン
type EmailLogin struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"password"`
}

// UpdatePassword パスワードアップデート用
type UpdatePassword struct {
	gorm.Model
	BeforePassword string `json:"beforePassword"`
	AfterPassword  string `json:"afterPassword"`
}
