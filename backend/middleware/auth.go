package middleware

import (
	"net/http"
	"os"

	"app/auth"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
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
