import axios from 'axios';
import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { AuthContext } from '../../components/state/AuthStore';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import SvgIcon from '@mui/material/SvgIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { stateName, textStateFamily, topicListState } from '../../components/state/createStore';
import IconButton from '@mui/material/IconButton';
import { skillsItems } from '../api/icon';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
import editor from '../../styles/molecules/Editor.module.scss';
import { getUser } from './userAPI';

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
  { id: '1', displayName: 'Login', to: url.login },
  { id: '2', displayName: 'Article', to: url.article },
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

// 作成した記事を公開する
export const usePublishArticle = (createID) => {
  const title = useRecoilValue(textStateFamily(createID + stateName.title));
  const markdown = useRecoilValue(textStateFamily(createID + stateName.markdown));
  const selectedTopic = useRecoilValue(topicListState(createID + stateName.selectedTopicsID));
  const publishArticle = useCallback(async () => {
    let isSuccess = false;
    const data = { title: title, markdown: markdown, topic: selectedTopic };

    await axios
      .post(api.postArticle, data, { withCredentials: true })
      .then(() => {
        isSuccess = true;
      })
      .catch(() => {
        isSuccess = false;
      });

    console.log(isSuccess);
    return isSuccess;
  });
  return publishArticle;
};

export const getArticleList = async (page) => {
  const res = await axios.get(api.getArticles + page);
  return res.data;
};

// 記事のリスト(ページ単位)を取得
export const useGetPostArticle = () => {
  const getArticleList = useCallback(async (page) => {
    //e.preventDefault();
    let articles = [];
    let isSuccess = false;
    console.log(api.getArticles + page);
    await axios
      .get(api.getArticles + page)
      .then((res) => {
        articles = res.data;
        isSuccess = true;
      })
      .catch(() => {
        isSuccess = false;
      });

    return { articles, isSuccess };
  });
  return getArticleList;
};

export const getArticle = async (path) => {
  const res = await axios.get(api.getArticle + path);
  return res.data;
};
/*
// 記事のリスト(ページ単位)を取得
export const useGetArticleContent = () => {
  const getArticle = useCallback(async (path) => {
    //e.preventDefault();
    let articles = [];
    let isSuccess = false;
    await axios
      .get(api.getArticle + path)
      .then((res) => {
        articles = res.data;
        isSuccess = true;
      })
      .catch(() => {
        isSuccess = false;
      });

    return articles;
  });
  return getArticle;
};
*/
export const getPostList = async (...args) => {
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

export const getTopicList = async (...args) => {
  console.log(...args);
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

export const getSearchList = async (...args) => {
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

// ページ数を返却する
export const getPageCount = (count) => {
  let pageCount = Math.round(count / 12);
  if (count % 12 !== 0) {
    pageCount++;
  }
  console.log(count);
  return pageCount;
};
