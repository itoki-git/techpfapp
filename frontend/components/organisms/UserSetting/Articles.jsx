import React, { useState } from 'react';
import styles from '../../../styles/organisms/CardList.module.scss';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import useSWR from 'swr';
import { getPrivatePostList, removeArticle } from '../../../pages/api/articleAPI';
import { LinearLoad } from '../../atoms/Loading';
import router from 'next/router';
import { url } from '../../../pages/api/utility';
import { EditCardList } from '../CardList';
import { AlertDialog } from '../../molecules/Dialog';
import { MessageSnackbar } from '../../atoms/MessageBar';

const Articles = () => {
  const { data, error } = useSWR(`api/private/posts`, getPrivatePostList);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '更新できませんでした',
    severity: 'error',
  });

  if (error) {
    router.replace(url.notpage);
  }
  if (!data) return <LinearLoad />;

  const onClickDelete = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleRemoveArticle = async (e) => {
    e.preventDefault();
    const result = await removeArticle(id);
    setOpen(false);
    setBarState({ ...barState, open: result === 1, message: '記事を削除しました', severity: 'success' });
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
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
          <EditCardList data={data.PostList} onClickDelete={onClickDelete} />
        </div>
      )}

      <AlertDialog handleAlertClose={handleAlertClose} open={open} remove={handleRemoveArticle} />
      {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
    </div>
  );
};
export default Articles;
