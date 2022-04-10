package main

import (
	"app/controllers/controller"
	"app/middleware"

	// middleware
	// Gin
	"github.com/gin-gonic/gin"
	// MySQL用ドライバ
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// cors

	"github.com/gin-contrib/cors"
)

func server() *gin.Engine {
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
	api := router.Group("/api")
	{
		public := api.Group("/public")
		{
			public.POST("/users", controller.CreateUser)
			public.POST("/login", controller.LoginUser)
			public.GET("/posts/:id", controller.GetPost)
			public.GET("/article", controller.GetPostList)
			public.GET("/users/:id", controller.GetUser)
			public.GET("/topics/:topic", controller.GetPostTopicList)
			public.GET("/search", controller.GetSearchList)
		}
		private := api.Group("/private").Use(middleware.Auth())
		{
			private.POST("/logout", controller.Logout)
			private.GET("/me", controller.GetProfile)
			private.POST("/posts", controller.CreatePost)
			private.GET("/posts", controller.GetUserPost)
			private.POST("/posts/upload", controller.UploadImage)
			private.PATCH("/users", controller.UpdateProfile)
			private.PATCH("/posts/:id", controller.UpdateLike)

		}
	}
	return router
}

func main() {
	router := server()
	router.Run(":8080")
}
