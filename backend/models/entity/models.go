package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name,omitempty" bson:"name,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type Post struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	JobTitle  string             `json:"jobtitle" bson:"jobtitle,omitempty"`
	Bio       string             `json:"bio" bson:"bio,omitempty"`
	Image     string             `json:"image" bson:"image,omitempty"`
	Timestamp time.Time          `json:"timestamp" bson:"timestamp,omitempty"`
	Author    string             `json:"author" bson:"author,omitempty"`
}
