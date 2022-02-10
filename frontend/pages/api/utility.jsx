import axios from 'axios';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../components/state/AuthStore';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stateName, textStateFamily } from '../../components/state/createStore';

export const url = {
  home: '/',
  logout: '/logout',
  login: '/login',
  signup: '/signup',
  create: '/create',
  article: '/article',
  demo: '/demo',
  setting: '/setting',
};

export const api = {
  logout: 'api/logout',
  login: 'api/login',
  signup: 'api/users',
  user: 'api/user',
  register_article: 'api/registerArticle',
};

export const privateMenu = [
  { id: '1', displayName: 'HOME', to: url.article },
  { id: '2', displayName: 'CREATE', to: url.create },
  //{ id: '3', displayName: 'Page', to: url.demo },
  { id: '4', displayName: 'MYPAGE', to: url.setting },
];
export const publicMenu = [
  { id: '1', displayName: 'Login', to: url.login },
  { id: '2', displayName: 'Article', to: url.article },
];
export const createMenu = [
  { id: '1', displayName: <SettingsIcon />, to: url.login },
  { id: '2', displayName: <Button variant="contained">公開する</Button>, to: url.article },
];

export const config = {
  bucketName: process.env.NEXT_PUBLIC_S3_BUCKET,
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
};

export const useLogin = () => {
  const router = useRouter();
  const isReady = router.isReady;
  const email = useRecoilValue(textStateFamily(stateName.loginEmail));
  const password = useRecoilValue(textStateFamily(stateName.loginPassword));
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const login = async (e) => {
    const data = { email: email, password: password };
    e.preventDefault();
    await axios
      .post(api.login, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: 'GET_NAME',
          payload: res.data.name,
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: res.data.email,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        if (!loading) {
          router.push(url.article);
        }
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
      });
  };
  return login;
};

export function useRequireLogin() {
  const { state, dispatch } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios
      .post('/api/users/check', {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: 'GET_NAME',
          payload: res.data.name,
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: res.data.email,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        setIsLogin(true);
        console.log('login');
      })
      .catch(() => {
        dispatch({
          type: 'GET_NAME',
          payload: '',
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: '',
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
        router.push(url.login);
      });
  }, [isLogin]);
}

// useLogout ログアウト処理
export const useLogout = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isReady) {
      setLoading(true);
    }
  }, [isReady]);
  const logout = useCallback(async () => {
    await axios
      .post('/api/logout', {
        withCredentials: true,
      })
      .then(() => {
        dispatch({
          type: 'GET_NAME',
          payload: '',
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: '',
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
        if (!loading) {
          router.push(url.login);
        } else {
          console.log('logout');
        }
      });
  }, []);

  return logout;
};

export const useUploadFIle = async (e) => {
  e.preventDefault();
  let s3url = null;
  const data = { filename: e.target.files[0].name };
  // get url from backend
  await axios
    .post('api/posts/upload', data, {
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

  const imageUrl = s3url.split('?')[0];
  console.log(imageUrl);
};
