package main

import (
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
			"Content-Type:application/json",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// COOKIEなどの情報を必要とするか
		AllowCredentials: true,
	}))
	router.POST("/posts", controller.CreatePost)
	router.GET("/posts/id", controller.GetPost)
	router.POST("/users", controller.CreateUser)
	router.GET("/users/:id", controller.GetUser)
	//router.POST("/login", controller.LoginUser)

	router.Run(":8080")
}
