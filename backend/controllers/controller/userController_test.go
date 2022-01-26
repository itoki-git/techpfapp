package controller

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestCreateUser(t *testing.T) {
	var jsonStr = []byte(`{"Name":"testuser","Email":"testuser.com","Password":"testpass"}`)
	expected := `{"InsertedID":"61617eaf8d9c98800c05de5f"}`
	ctx, _ := gin.CreateTestContext(httptest.NewRecorder())

	req, err := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Add("Authorization", "AccessToken")
	ctx.Request = req
	CreateUser(ctx)
	asserts := assert.New(t)
	asserts.Equal(expected, ctx)
}
