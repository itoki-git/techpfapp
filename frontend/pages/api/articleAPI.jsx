import axios from 'axios';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { stateName, textStateFamily, topicListState } from '../../components/state/createStore';
import { api } from './utility';

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

// パスの記事を取得
export const getArticle = async (...args) => {
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

// 投稿された記事を取得
export const getPostList = async (...args) => {
  try {
    let res = await axios.get(...args);
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

// トピックごとに記事を取得
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

// 検索されたワードで記事を取得
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

// 投稿された記事を取得(private)
export const getPrivatePostList = async (...args) => {
  try {
    let res = await axios.get(...args, { withCredentials: true });
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

export const handleLikeButton = async (id) => {
  const query = api.like + id;
  try {
    let res = await axios.patch(query, { withCredentials: true });
    return res.data;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};

// 記事にいいねしているか
export const getArticleLike = async (...args) => {
  try {
    const res = await axios.get(...args, { withCredentials: true });
    return res.data.liked;
  } catch (error) {
    error.status = 403;
    throw error;
  }
};
