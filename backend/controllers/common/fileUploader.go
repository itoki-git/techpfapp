package common

import (
	"io"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

// UploadFile 画像ファイルを保存する
func UploadFile(ctx *gin.Context) {
	file, header, _ := ctx.Request.FormFile("file")
	registrationTime := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(registrationTime.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(registrationTime), entropy)
	// 拡張子を取り出す
	e := filepath.Ext(header.Filename)
	filename := "../app/data/images/" + id.String() + e
	saveFile, _ := os.Create(filename)
	defer saveFile.Close()
	io.Copy(saveFile, file)
	ctx.JSON(http.StatusOK, filename)
	//ctx.JSON(http.StatusOK, gin.H{"message": "success!!"})
}
