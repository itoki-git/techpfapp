import React, { useState } from 'react';
import style from '../../../styles/organisms/UserSetting/Skills.module.scss';
import Paper from '@mui/material/Paper';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import styles from '../../../styles/organisms/CardList.module.scss';
import CardList from '../CardList';
import useSWR from 'swr';
import { getUserLikePost } from '../../../pages/api/articleAPI';

const Likes = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, error } = useSWR(`api/private/posts/like`, getUserLikePost);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div elevation={1} className={settingStyle.paper}>
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
