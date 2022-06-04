package common

import (
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
)

func GetUUID() (string, error) {
	id, err := uuid.NewRandom()
	if err != nil {
		return "", err
	}
	uu := id.String()
	return uu, nil
}

func S3(folder, fileName string) (string, error) {
	accessKey := os.Getenv("S3_ACCESS_KEY")
	privateKey := os.Getenv("S3_SECRET_KEY")
	region := os.Getenv("S3_REGION")
	bucketName := os.Getenv("S3_BUCKET_NAME")

	creds := credentials.NewStaticCredentials(accessKey, privateKey, "")
	sess := session.Must(session.NewSession(&aws.Config{
		Credentials: creds,
		Region:      aws.String(region),
	}))
	s3Client := s3.New(sess)

	req, _ := s3Client.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(folder + fileName),
	})
	preID, err := req.Presign(3 * time.Minute) // 有効期限3分
	if err != nil {
		return "", err
	}
	return preID, nil
}
