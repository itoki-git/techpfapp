import axios from 'axios';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../components/state/AuthStore';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  signup: 'api/signup',
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

export const config = {
  bucketName: process.env.NEXT_PUBLIC_S3_BUCKET,
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
};

export function useRequireLogin() {
  const { state, dispatch } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios
      .post('/api/user', {
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
          type: 'GET_SHORT_PROFILE',
          payload: res.data.shortProfile,
        });
        dispatch({
          type: 'GET_PROFILE',
          payload: res.data.profile,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        setIsLogin(true);
      })
      .catch(() => {
        router.push(url.login);
      });
    if (!isLogin) return;
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
