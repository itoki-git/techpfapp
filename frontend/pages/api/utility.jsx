import axios from 'axios';
import React, { useState, useContext, useCallback, useEffect } from 'react';
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
import { IconButton } from '@mui/material';
import editor from '../../styles/molecules/Editor.module.scss';

export const url = {
  home: '/',
  login: '/login',
  signup: '/signup',
  create: '/create',
  article: '/article',
  demo: '/demo',
  setting: '/setting',
};

export const api = {
  login: 'api/login',
  logout: 'api/logout',
  signup: 'api/users',
  user: 'api/user',
  register_article: 'api/registerArticle',
  s3Upload: 'api/posts/upload',
  postArticle: 'api/posts',
  updateUser: 'api/users',
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

export const useLogin = () => {
  const router = useRouter();
  const isReady = router.isReady;
  const email = useRecoilValue(textStateFamily(stateName.loginEmail));
  const password = useRecoilValue(textStateFamily(stateName.loginPassword));
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const login = useCallback(async (e) => {
    let isLogin = false;
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
          type: 'GET_JOBNAME',
          payload: res.data.jobname,
        });
        dispatch({
          type: 'GET_BIO',
          payload: res.data.bio,
        });
        dispatch({
          type: 'GET_IMAGE',
          payload: res.data.image,
        });
        dispatch({
          type: 'GET_SKILLS',
          payload: res.data.skill,
        });
        dispatch({
          type: 'GET_ARTICLE',
          payload: res.data.article,
        });
        dispatch({
          type: 'GET_LIKE',
          payload: res.data.like,
        });
        dispatch({
          type: 'GET_WATCHLATER',
          payload: res.data.watchlater,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        console.log(res.data);
        if (!loading) {
          router.push(url.article);
        }
        isLogin = true;
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
        isLogin = false;
      });
    return isLogin;
  });
  return login;
};

export function useRequireLogin() {
  const { state, dispatch } = useContext(AuthContext);

  const checkLoginUser = useCallback(async () => {
    let isLogin = false;
    await axios
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
          type: 'GET_JOBNAME',
          payload: res.data.jobname,
        });
        dispatch({
          type: 'GET_BIO',
          payload: res.data.bio,
        });
        dispatch({
          type: 'GET_IMAGE',
          payload: res.data.image,
        });
        dispatch({
          type: 'GET_SKILLS',
          payload: res.data.skill,
        });
        dispatch({
          type: 'GET_ARTICLE',
          payload: res.data.article,
        });
        dispatch({
          type: 'GET_LIKE',
          payload: res.data.like,
        });
        dispatch({
          type: 'GET_WATCHLATER',
          payload: res.data.watchlater,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
        isLogin = true;
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
        isLogin = false;
      });
    return isLogin;
  });
  return checkLoginUser;
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
      .post(api.logout, {
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
    const topic = selectedTopic.map((item) => item.id);
    const data = { title: title, markdown: markdown, topic: topic };
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

// ユーザー情報を更新する
export const useUpdataProfile = () => {
  const name = useRecoilValue(textStateFamily(stateName.userName));
  const jobName = useRecoilValue(textStateFamily(stateName.jobName));
  const bio = useRecoilValue(textStateFamily(stateName.bio));
  const image = useRecoilValue(textStateFamily(stateName.userImage));
  const skill = useRecoilValue(topicListState(stateName.userSkill + stateName.selectedTopicsID));
  const updateProfile = useCallback(async (e) => {
    e.preventDefault();

    const skillID = skill.map((item) => item.id);

    const data = { name: name, jobname: jobName, bio: bio, image: image, skill: skillID };

    let isSuccess = false;
    await axios
      .patch(api.updateUser, data, {
        withCredentials: true,
      })
      .then(() => {
        isSuccess = true;
      })
      .catch(() => {
        isSuccess = false;
      });
    return isSuccess;
  });
  return updateProfile;
};
