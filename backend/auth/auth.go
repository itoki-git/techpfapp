package auth

import (
	"errors"
	"fmt"
	"time"

	"github.com/form3tech-oss/jwt-go"
)

// JwtWrapper 署名鍵と発行者
type JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

// JwtClaim トークンにクレームとしてユーザーIDを追加します。
type JwtClaim struct {
	UserID string
	jwt.StandardClaims
}

// GenerateToken jwtトークンを生成
func (jwtWrapper *JwtWrapper) GenerateToken(userID string) (signedToken string, err error) {
	claims := &JwtClaim{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(jwtWrapper.ExpirationHours)).Unix(),
			Issuer:    jwtWrapper.Issuer,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err = token.SignedString([]byte(jwtWrapper.SecretKey))
	if err != nil {
		fmt.Println(err)
		return
	}
	return
}

// ValidateToken トークンを検証する
func (jwtWrapper *JwtWrapper) ValidateToken(signedToken string) (claims *JwtClaim, err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtWrapper.SecretKey), nil

		},
	)
	if err != nil {
		return
	}
	claims, ok := token.Claims.(*JwtClaim)
	if !ok {
		err = errors.New("Couldn't parse claims")
		return
	}
	if claims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("JWT is expired")
		return
	}
	return
}
