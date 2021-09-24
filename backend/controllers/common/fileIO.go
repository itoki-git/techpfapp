package common

import (
	"io/ioutil"
	"os"
)

// CreateFolder フォルダを作成する
func CreateFolder(path string) error {
	if _, err := os.Stat(path); err != nil {
		err := os.Mkdir(path, 0777)
		return err
	}
	return nil
}

// RemoveFolder フォルダを削除する
func RemoveFolder(path string) error {
	err := os.RemoveAll(path)
	return err
}

// FileWrite ファイル書き込み
func FileWrite(path string, data string) error {
	err := ioutil.WriteFile(path, []byte(string(data)), 0664)
	return err
}

// FileRead ファイル読み込み
func FileRead(path string) ([]byte, error) {
	readFile, err := ioutil.ReadFile(path)
	return readFile, err
}

// RemoveFile ファイルを削除する
func RemoveFile(path string) error {
	err := os.Remove(path)
	return err
}
