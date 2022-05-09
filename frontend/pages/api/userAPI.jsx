import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR, { mutate } from 'swr';
import { stateName, textStateFamily, topicListState } from '../../components/state/createStore';
import { skillsItems } from './icon';
import { api, url } from './utility';

export const useSignup = () => {
  const [nickname, setNickname] = useRecoilState(textStateFamily(stateName.signupNickName));
  const [username, setUsername] = useRecoilState(textStateFamily(stateName.signupUserName));
  const [password, setPassword] = useRecoilState(textStateFamily(stateName.signupPassword));

  const signup = useCallback(async () => {
    const data = { nickname: nickname, username: username, password: password };
    try {
      const res = await axios.post(api.signup, data);
      setNickname('');
      setUsername('');
      setPassword('');
      return true;
    } catch (error) {
      return false;
    }
  });
  return signup;
};

export const useLogin = () => {
  const [username, setUsername] = useRecoilState(textStateFamily(stateName.loginUserName));
  const [password, setPassword] = useRecoilState(textStateFamily(stateName.loginPassword));

  const login = useCallback(async () => {
    const data = { username: username, password: password };
    try {
      const res = await axios.post(api.login, data);
      setUsername('');
      setPassword('');
      return true;
    } catch (error) {
      return false;
    }
  });
  return login;
};

// ログアウト処理
export const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      await axios.post(api.logout, { withCredentials: true });
      return true;
    } catch (error) {
      return false;
    }
  });
  return logout;
};

// ログインユーザーのプロフィール取得
export const getUserInfo = async () => {
  const setUserName = useSetRecoilState(textStateFamily(stateName.nickName));
  const setJobName = useSetRecoilState(textStateFamily(stateName.jobName));
  const setBio = useSetRecoilState(textStateFamily(stateName.bio));
  const setUserImage = useSetRecoilState(textStateFamily(stateName.userImage));
  const setSelectTopics = useSetRecoilState(topicListState(stateName.userSkill + stateName.selectedTopicsID));

  const res = await axios.get(api.me, {
    withCredentials: true,
  });
  const skillIcon = skillsItems.filter((item) => {
    if (res.data.skill && res.data.skill.includes(item.id)) {
      return item;
    }
  });
  if (res.data) {
    setUserName(res.data.nickname ? res.data.nickname : '');
    setJobName(res.data.jobname ? res.data.jobname : '');
    setBio(res.data.bio ? res.data.bio : '');
    setUserImage(res.data.image ? res.data.image : '');
    setSelectTopics(res.data.skill ? skillIcon : []);
  }
};

// ユーザー情報を更新する
export const useUpdataProfile = () => {
  const nickname = useRecoilValue(textStateFamily(stateName.nickName));
  const jobName = useRecoilValue(textStateFamily(stateName.jobName));
  const bio = useRecoilValue(textStateFamily(stateName.bio));
  const image = useRecoilValue(textStateFamily(stateName.userImage));
  const skill = useRecoilValue(topicListState(stateName.userSkill + stateName.selectedTopicsID));
  const updateProfile = useCallback(async (e) => {
    e.preventDefault();

    const skillID = skill.map((item) => item.id);

    const data = { nickname: nickname, jobname: jobName, bio: bio, image: image, skill: skillID };

    console.log(data);

    let isSuccess = false;
    await axios
      .patch(api.updateUser, data, {
        withCredentials: true,
      })
      .then(() => {
        isSuccess = true;
        mutate('api_user_me');
      })
      .catch(() => {
        isSuccess = false;
      });
    return isSuccess;
  });
  return updateProfile;
};

export const getUser = async () => {
  try {
    let res = await axios.get(api.me, { withCredentials: true });
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};
export async function getServerUser(cookie) {
  const jwt = 'jwt=' + cookie.jwt;
  try {
    let res = await axios.get(api.serverMe, {
      headers: {
        Cookie: jwt,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
}

export function useUser() {
  const { data, mutate, error } = useSWR('api_user', getUser, {
    errorRetryInterval: 20000,
    refreshInterval: 60000,
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

export function useServerUser(cookie) {
  const { data, mutate, error } = useSWR('api_serveruser', getServerUser(cookie));

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

export const getUserProfile = async (...args) => {
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

export const Protected = () => {
  const { loggedOut } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (loggedOut) {
      router.replace(url.forbidden);
    }
  }, [loggedOut]);
};

// ユーザーがログインしているか
export const userState = atom({
  key: 'user/userState',
  default: false,
});
