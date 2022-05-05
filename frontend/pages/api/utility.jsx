import axios from 'axios';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { textStateFamily } from '../../components/state/createStore';

export const url = {
  home: '/',
  login: '/login',
  signup: '/signup',
  create: '/create',
  article: '/article',
  setting: '/setting',
  search: '/search',
  forbidden: '/403',
  notpage: '/404',
};

export const api = {
  login: '/api/public/login',
  logout: '/api/private/logout',
  signup: '/api/public/users',
  user: '/api/public/users/',
  me: '/api/private/me',
  register_article: '/api/private/registerArticle',
  s3Upload: '/api/private/posts/upload',
  postArticle: '/api/private/posts',
  updateUser: '/api/private/users',
  getArticles: 'http://webServer:80/api/public/article?page=',
  getArticle: '/api/public/posts/',
  getUserProfile: '/api/public/users/',
  serverMe: 'http://webServer:80/api/private/me',
  like: '/api/private/posts/',
  isLike: '//api/private/posts/',
};

export const privateMenu = [
  { id: '1', displayName: 'ARTICLE', to: url.article + '?page=1' },
  { id: '2', displayName: 'CREATE', to: url.create },
  { id: '4', displayName: 'MYPAGE', to: url.setting },
];
export const publicMenu = [
  { id: '1', displayName: 'ARTICLE', to: url.article },
  { id: '2', displayName: 'LOGIN', to: url.login },
];

export const config = {
  bucketName: process.env.NEXT_PUBLIC_S3_BUCKET,
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
};

// S3にアップロード
export const useUploadFile = () => {
  const getS3URL = useCallback(async (e) => {
    e.preventDefault();
    let s3url = null;
    const data = { filename: e.target.files[0].name };
    // get url from backend
    await axios
      .post(api.s3Upload, data, {
        withCredentials: true,
      })
      .then((res) => {
        s3url = res.data.s3url;
      });

    // post image s3 bucket
    await axios({
      method: 'PUT',
      url: s3url,
      headers: {
        'Content-Type': e.target.files[0].type,
      },
      data: e.target.files[0],
    });
    return s3url.split('?')[0];
  }, []);
  return getS3URL;
};

// textareaのカーソルの位置に文字を挿入する
export const useInsertTextarea = (stateID) => {
  const setMarkdown = useSetRecoilState(textStateFamily(stateID));
  const insertTextarea = useCallback((inner) => {
    const marparea = document.getElementById(stateID);
    const sentence = marparea.value;
    const index = marparea.selectionStart;
    marparea.value = sentence.substr(0, index) + inner + sentence.substr(index, sentence.length);
    marparea.focus();
    const newCaret = index + inner.length;
    marparea.setSelectionRange(newCaret, newCaret);
    setMarkdown(marparea.value);
  }, []);
  return insertTextarea;
};
