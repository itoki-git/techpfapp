package entity

import (
	"app/models/db"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var UserCollection = db.ConnectUsersDB()

type CreateUser struct {
	ID         primitive.ObjectID   `json:"_id" bson:"_id"`
	NickName   string               `json:"nickname" bson:"nickname"`
	UserName   string               `json:"username" bson:"username"`
	Password   string               `json:"password" bson:"password"`
	JobName    string               `json:"jobname" bson:"jobname"`
	Bio        string               `json:"bio" bson:"bio"`
	Image      string               `json:"image" bson:"image"`
	Skills     []string             `json:"skill" bson:"skill"`
	Article    []primitive.ObjectID `json:"article" bson:"article"`
	Like       []primitive.ObjectID `json:"like" bson:"like"`
	WatchLater []primitive.ObjectID `json:"watchlater" bson:"watchlater"`
}
type User struct {
	ID       primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	NickName string               `json:"nickname,omitempty" bson:"nickname,omitempty"`
	UserName string               `json:"username,omitempty" bson:"username,omitempty"`
	Password string               `json:"password,omitempty" bson:"password,omitempty"`
	JobName  string               `json:"jobname,omitempty" bson:"jobname,omitempty"`
	Bio      string               `json:"bio,omitempty" bson:"bio,omitempty"`
	Image    string               `json:"image,omitempty" bson:"image,omitempty"`
	Skills   []string             `json:"skill,omitempty" bson:"skill,omitempty"`
	Article  []primitive.ObjectID `json:"article,omitempty" bson:"article,omitempty"`
	Like     []primitive.ObjectID `json:"like,omitempty" bson:"like,omitempty"`
}
type LoginUser struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	NickName string             `json:"nickname,omitempty" bson:"nickname,omitempty"`
	UserName string             `json:"username,omitempty" bson:"username,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type LoginPayload struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

type PostUser struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserName string             `json:"name,omitempty" bson:"name,omitempty"`
	Image    string             `json:"image,omitempty" bson:"image,omitempty"`
}

type Post struct {
	ArticleID   primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
	AuthorID    primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Title       string             `json:"title" bson:"title,omitempty"`
	Topic       []TopicInfo        `json:"topic" bson:"topic,omitempty"`
	PublishedAt time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
}

type Article struct {
	ArticleID primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
	AuthorID  primitive.ObjectID `json:"authorID" bson:"authorID,omitempty"`
	Title     string             `json:"title" bson:"title,omitempty"`
	Markdown  string             `json:"markdown" bson:"markdown,omitempty"`
	Topic     []TopicInfo        `json:"topic" bson:"topic,omitempty"`
	Timestamp time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
}

type PostResponse struct {
	PostList  []Post
	PostCount int
}

type TopicInfo struct {
	TopicID   string `json:"id" bson:"id,omitempty"`
	TopicName string `json:"iconName" bson:"iconName,omitempty"`
}
type Image struct {
	FileName string `json:"filename"`
}

type Like struct {
	Users     []LikeUser         `json:"users" bson:"users"`
	ArticleID primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
}

type LikeUser struct {
	UserID    primitive.ObjectID `json:"_id" bson:"_id"`
	Timestamp time.Time          `json:"timestamp" bson:"timestamp"`
}

// HashPassword パスワードを暗号化する
func (user *User) HashPassword(password string) error {
	byte, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}

	user.Password = string(byte)
	return nil
}

// CheckPassword パスワードを検証する
func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		fmt.Println("CheckPassword FAILS")
		return err
	}

	fmt.Println("CheckPassword OK")

	return nil
}

// CreateUserRecord ユーザーの初期値などを登録する
func (user User) CreateUserRecord() error {
	// 初期値を入力
	register := CreateUser{
		ID:         primitive.NewObjectID(),
		NickName:   user.NickName,
		UserName:   user.UserName,
		Password:   user.Password,
		JobName:    "",
		Bio:        "",
		Image:      "",
		Skills:     []string{},
		Article:    []primitive.ObjectID{},
		Like:       []primitive.ObjectID{},
		WatchLater: []primitive.ObjectID{},
	}
	fmt.Println(register)
	_, err := UserCollection.InsertOne(context.TODO(), register)
	if err != nil {
		return err
	}
	return nil
}
