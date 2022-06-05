import React from 'react';

import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';

import { url } from '../../pages/api/utility';
import buttonStyle from '../../styles/atoms/Button.module.scss';
import styles from '../../styles/Layout.module.scss';
import errorStyle from '../../styles/organisms/Error.module.scss';
import Layout from './Layout';

const ForbiddenTemplate = () => {
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
          <div className={buttonStyle.buttonRoot}>
            <button className={buttonStyle.errorback} onClick={handleClickLogin}>
              ログインする
            </button>
          </div>
        </Stack>
      </div>
    </Layout>
  );
};
export default ForbiddenTemplate;
