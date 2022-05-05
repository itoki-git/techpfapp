import React from 'react';
import Layout from '../components/templates/Layout';
import Stack from '@mui/material/Stack';
import styles from '../styles/Layout.module.scss';
import errorStyle from '../styles/organisms/Error.module.scss';
import { useRouter } from 'next/router';
import { url } from './api/utility';

const Custom403 = () => {
  const router = useRouter();
  const handleClickLogin = () => {
    router.replace(url.login);
  };
  return (
    <Layout title="error">
      <div className={styles.center}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <h1 className={errorStyle.status}>Please login again</h1>
          <p className={errorStyle.message}>セッションの有効期限が切れました</p>
          <p className={errorStyle.message}>もう一度ログインしてください</p>
          <div className={errorStyle.button}>
            <a onClick={handleClickLogin}>ログインする</a>
          </div>
        </Stack>
      </div>
    </Layout>
  );
};
export default Custom403;
