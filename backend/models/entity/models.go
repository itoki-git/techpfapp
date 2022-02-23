package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CreateUser struct {
	ID         primitive.ObjectID   `json:"_id" bson:"_id"`
	Name       string               `json:"name" bson:"name"`
	Email      string               `json:"email" bson:"email"`
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
	ID         primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name       string               `json:"name,omitempty" bson:"name,omitempty"`
	Email      string               `json:"email,omitempty" bson:"email,omitempty"`
	Password   string               `json:"password,omitempty" bson:"password,omitempty"`
	JobName    string               `json:"jobname,omitempty" bson:"jobname,omitempty"`
	Bio        string               `json:"bio,omitempty" bson:"bio,omitempty"`
	Image      string               `json:"image,omitempty" bson:"image,omitempty"`
	Skills     []string             `json:"skill,omitempty" bson:"skill,omitempty"`
	Article    []primitive.ObjectID `json:"article,omitempty" bson:"article,omitempty"`
	Like       []primitive.ObjectID `json:"like,omitempty" bson:"like,omitempty"`
	WatchLater []primitive.ObjectID `json:"watchlater,omitempty" bson:"watchlater,omitempty"`
}
type LoginUser struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name,omitempty" bson:"name,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type Post struct {
	Author  primitive.ObjectID   `json:"author" bson:"author,omitempty"`
	Name    string               `json:"name" bson:"name,omitempty"`
	Email   string               `json:"email,omitempty" bson:"email,omitempty"`
	JobName string               `json:"jobname" bson:"jobname,omitempty"`
	Bio     string               `json:"bio" bson:"bio,omitempty"`
	Image   string               `json:"image" bson:"image,omitempty"`
	Article []primitive.ObjectID `json:"article" bson:"article,omitempty"`
}

type Article struct {
	ArticleID primitive.ObjectID `json:"articleID,omitempty" bson:"articleID,omitempty"`
	Author    primitive.ObjectID `json:"authorID" bson:"authorID,omitempty"`
	Title     string             `json:"title" bson:"title,omitempty"`
	Markdown  string             `json:"markdown" bson:"markdown,omitempty"`
	Topic     []string           `json:"topic" bson:"topic,omitempty"`
	Timestamp time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
}
type Image struct {
	FileName string `json:"filename"`
}
