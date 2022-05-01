import React, { useState } from 'react';
import styles from '../../../styles/organisms/CardList.module.scss';
import Paper from '@mui/material/Paper';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import CardList from '../CardList';
import useSWR from 'swr';
import { getPrivatePostList } from '../../../pages/api/articleAPI';

const Articles = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, error } = useSWR(`api/private/posts`, getPrivatePostList);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
