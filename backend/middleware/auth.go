package middleware

import (
	"log"
	"net/http"
	"os"

	"app/auth"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func Auth() gin.HandlerFunc {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loadingas .env file")
	}
	secretKey := os.Getenv("SECRET_KEY")
	Issuer := os.Getenv("Issuer")

	return func(ctx *gin.Context) {
		clientToken, err := ctx.Cookie("jwt")
		if clientToken == "" || err != nil {
			ctx.JSON(http.StatusForbidden, "No Authorization")
			ctx.Abort()
			return
		}

		jwtWrapper := auth.JwtWrapper{
			SecretKey: secretKey,
			Issuer:    Issuer,
		}
		claims, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, err.Error())
			ctx.Abort()
			return
		}
		ctx.Set("userID", claims.UserID)
		ctx.Next()
	}
}
