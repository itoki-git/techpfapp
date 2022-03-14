import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR, { mutate } from 'swr';
import { stateName, textStateFamily, topicListState } from '../../components/state/createStore';
import { userState } from '../../components/state/currentUser';
import { skillsItems } from './icon';
import { api, url } from './utility';

export const useLogin = () => {
  const username = useRecoilValue(textStateFamily(stateName.loginUserName));
  const password = useRecoilValue(textStateFamily(stateName.loginPassword));
  const setCurrentUser = useSetRecoilState(userState);

  const login = useCallback(async () => {
    const data = { username: username, password: password };
    try {
      const res = await axios.post(api.login, data);
      setCurrentUser(res.data);
    } catch (error) {
      setCurrentUser(null);
      console.log(error);
    }
  });
  return login;
};

export const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      await axios.post(api.logout, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  });
  return logout;
};

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
  console.log(skillIcon);
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
  console.log(api.me);
  try {
    let res = await axios.get(api.me, { withCredentials: true });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default function useUser() {
  const setCurrentUser = useSetRecoilState(userState);
  const { data, mutate, error } = useSWR('api_user', getUser);

  const loading = !data && !error;
  let loggedIn = false;
  if (!error && data) {
    loggedIn = true;
  }
  if (loggedIn) {
    setCurrentUser(data);
  } else {
    setCurrentUser(null);
  }

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}
