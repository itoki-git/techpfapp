package main

import (
	common "app/controllers/common"
	controller "app/controllers/controller"

	// middleware
	// Gin
	"github.com/gin-gonic/gin"
	// MySQL用ドライバ
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// cors
	"github.com/gin-contrib/cors"
)

func main() {
	server()
}

func server() {
	// ginのルーターを作成
	router := gin.Default()
	//store := cookie.NewStore([]byte("secret"))

	//router.Use(sessions.Sessions("mysession", store))
	// cors設定
	router.Use(cors.New(cors.Config{
		// アクセス許可するURL
		AllowOrigins: []string{
			`http://localhost:3000`,
		},
		// アクセス許可するHTTPメソッド
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
		},
		// 許可するHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type：application/json",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// COOKIEなどの情報を必要とするか
		AllowCredentials: true,
	}))
	// ユーザー情報をDB登録する
	router.POST("/signup", controller.SignupUser)
	// ログイン
	router.POST("/login", controller.Login)
	// ユーザー情報の取得
	router.POST("/user", controller.User)
	// ログアウト
	router.POST("/logout", controller.Logout)
	// Name, Emailの更新
	router.POST("/updateAccount", controller.UpdateAccount)
	// パスワードの更新
	router.POST("/updatePassword", controller.UpdatePassword)
	// プロフィールの更新
	router.POST("/updateProfile", controller.UpdateProfile)
	// アカウント削除
	router.POST("/removeAccount", controller.RemoveAccount)
	// 画像アップロード・保存
	router.POST("/upload", common.UploadFile)

	// 全ての記事情報のJSONを返す
	router.GET("/getAllArticle", controller.GetAllArticle)
	// ユーザーの記事情報のJSONを返す
	router.POST("/getUserArticle", controller.GetUserArticle)
	// 1つの記事情報のJSONを返す
	router.POST("/getArticle", controller.GetSpecifiedArticle)
	// 記事をDB登録する
	router.POST("/registerArticle", controller.RegisterArticle)
	// 記事をアップデートする
	router.POST("/updateArticle", controller.UpadateArticle)
	// 記事をDB登録する
	router.POST("/getCreator", controller.GetCreatorInformation)
	// 記事を削除する
	router.POST("/removeArticle", controller.RemoveArticle)
	// 記事を削除する
	router.GET("/sample", controller.Sample)

	router.Run(":8080")
}
