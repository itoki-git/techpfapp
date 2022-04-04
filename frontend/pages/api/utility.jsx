import axios from 'axios';
import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { textStateFamily } from '../../components/state/createStore';
import IconButton from '@mui/material/IconButton';
import editor from '../../styles/molecules/Editor.module.scss';

export const url = {
  home: '/',
  login: '/login',
  signup: '/signup',
  create: '/create',
  article: '/article',
  demo: '/demo',
  setting: '/setting',
  search: '/search',
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
  getArticle: 'http://webServer:80/api/public/posts/',
  getUserProfile: 'http://webServer:80/api/public/users/',
  serverMe: 'http://webServer:80/api/private/me',
};

export const privateMenu = [
  {
    id: '0',
    displayName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="#1a1e26"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    ),
    to: url.search,
  },
  { id: '1', displayName: 'HOME', to: url.article + '?page=1' },
  { id: '2', displayName: 'CREATE', to: url.create },
  { id: '3', displayName: 'DEMO', to: url.demo },
  { id: '4', displayName: 'MYPAGE', to: url.setting },
];
export const publicMenu = [
  {
    id: '0',
    displayName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="#1a1e26"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    ),
    to: url.search,
  },
  { id: '1', displayName: 'Article', to: url.article },
  { id: '2', displayName: 'Login', to: url.login },
];
export const createMenu = [
  {
    id: '1',
    displayName: (
      <IconButton>
        <FontAwesomeIcon icon={faSliders} />
      </IconButton>
    ),
    to: url.login,
  },
  {
    id: '2',
    displayName: (
      <div className={editor.saveButton}>
        <Button>公開する</Button>
      </div>
    ),
    to: url.article,
  },
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
    console.log(s3url.split('?')[0]);
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
