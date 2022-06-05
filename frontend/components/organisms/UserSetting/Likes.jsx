import React from 'react';

import router from 'next/router';
import useSWR from 'swr';

import { getUserLikePost } from '../../../pages/api/articleAPI';
import { url } from '../../../pages/api/utility';
import styles from '../../../styles/organisms/CardList.module.scss';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import { LinearLoad } from '../../atoms/Loading';
import { CardList } from '../CardList';

const Likes = () => {
  const { data, error } = useSWR(`api/private/posts/like`, getUserLikePost);

  if (error) {
    router.replace(url.notpage);
  }
  if (!data) return <LinearLoad />;
  return (
    <div>
      <h5 className={settingStyle.pageTitle}>Likes</h5>
      {data.PostCount === 0 ? (
        <div>
          <div className={styles.contentEmpty}>いいねを押した記事がありません</div>
        </div>
      ) : (
        <CardList data={data.PostList} />
      )}
    </div>
  );
};
export default Likes;
