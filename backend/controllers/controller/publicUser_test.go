package controller

import (
	"fmt"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHashPassword(t *testing.T) {
	var user User
	user.Password = "secret"
	fmt.Println(user)
	err := user.HashPassword(user.Password)
	assert.NoError(t, err)
	os.Setenv("passwordHash", user.Password)
}

/*
func TestCreateUserRecord(t *testing.T) {
	var userResult User

	register := entity.CreateUser{
		ID:         primitive.NewObjectID(),
		NickName:   "Test User",
		UserName:   "Test User",
		Password:   os.Getenv("passwordHash"),
		JobName:    "",
		Bio:        "",
		Image:      "",
		Skills:     []string{},
		Article:    []primitive.ObjectID{},
		Like:       []primitive.ObjectID{},
		WatchLater: []primitive.ObjectID{},
	}
	_, err := UserCollection.InsertOne(context.TODO(), register)
	assert.NoError(t, err)

	filter := bson.M{"username": register.UserName}
	_ = UserCollection.FindOne(context.TODO(), filter).Decode(&userResult)

	_, _ = UserCollection.DeleteOne(context.TODO(), filter)

	assert.Equal(t, "Test User", userResult.NickName)
	assert.Equal(t, "test@email.com", userResult.UserName)
}
*/
func TestCheckPassword(t *testing.T) {
	var user User
	hash := os.Getenv("passwordHash")

	user.Password = hash
	err := user.CheckPassword("secret")
	assert.NoError(t, err)
}
