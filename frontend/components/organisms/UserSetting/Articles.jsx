import React from 'react';
import styles from '../../../styles/organisms/CardList.module.scss';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import CardList from '../CardList';
import useSWR from 'swr';
import { getPrivatePostList } from '../../../pages/api/articleAPI';
import { LinearLoad } from '../../atoms/Loading';
import router from 'next/router';
import { url } from '../../../pages/api/utility';

const Articles = () => {
  const { data, error } = useSWR(`api/private/posts`, getPrivatePostList);

  if (error) {
    router.replace(url.notpage);
  }
  if (!data) return <LinearLoad />;

  console.log(data);
  return (
    <div>
      <h5 className={settingStyle.pageTitle}>Articles</h5>
      {data.PostList.length === 0 ? (
        <div>
          <div className={styles.contentEmpty}>記事を作成していません</div>
        </div>
      ) : (
        <div>
          <CardList data={data.PostList} />
        </div>
      )}
    </div>
  );
};
export default Articles;
