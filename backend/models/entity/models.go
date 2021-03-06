package entity

import (
	"app/models/db"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var UserCollection = db.ConnectUsersDB()

type CreateUser struct {
	UserID     primitive.ObjectID   `json:"userID" bson:"userID"`
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
	UserID   primitive.ObjectID   `json:"userID" bson:"userID"`
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
	UserID   primitive.ObjectID `json:"userID" bson:"userID"`
	NickName string             `json:"nickname,omitempty" bson:"nickname,omitempty"`
	UserName string             `json:"username,omitempty" bson:"username,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type LoginPayload struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

// PostUser ????????????(??????????????????)
type PostUser struct {
	UserID   primitive.ObjectID `json:"userID" bson:"userID"`
	UserName string             `json:"username,omitempty" bson:"username,omitempty"`
	NickName string             `json:"nickname,omitempty" bson:"nickname,omitempty"`
	JobName  string             `json:"jobname,omitempty" bson:"jobname,omitempty"`
	Bio      string             `json:"bio,omitempty" bson:"bio,omitempty"`
	Skills   []string           `json:"skill,omitempty" bson:"skill,omitempty"`
	Image    string             `json:"image,omitempty" bson:"image,omitempty"`
}

// Post ???????????????????????????
type Post struct {
	ArticleID   primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
	UserID      primitive.ObjectID `json:"userID" bson:"userID,omitempty"`
	Title       string             `json:"title" bson:"title,omitempty"`
	Markdown    string             `json:"markdown" bson:"markdown,omitempty"`
	Topic       []TopicInfo        `json:"topic" bson:"topic,omitempty"`
	Like        int                `json:"like" bson:"like,omitempty"`
	PublishedAt time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
	User        PostUser           `json:"user" bson:"user,omitempty"`
}

// Article ???????????????
type Article struct {
	ArticleID   primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
	UserID      primitive.ObjectID `json:"userID" bson:"userID,omitempty"`
	Title       string             `json:"title" bson:"title,omitempty"`
	Markdown    string             `json:"markdown" bson:"markdown,omitempty"`
	Topic       []TopicInfo        `json:"topic" bson:"topic,omitempty"`
	PublishedAt time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
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

// HashPassword ?????????????????????????????????
func (user *User) HashPassword(password string) error {
	byte, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}

	user.Password = string(byte)
	return nil
}

// CheckPassword ??????????????????????????????
func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}

	return nil
}

// CreateUserRecord ?????????????????????????????????????????????
func (user User) CreateUserRecord() error {
	// ??????????????????
	register := CreateUser{
		UserID:     primitive.NewObjectID(),
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
	_, err := UserCollection.InsertOne(context.TODO(), register)
	if err != nil {
		return err
	}
	return nil
}
