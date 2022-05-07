import React from 'react';
import Layout from './Layout';
import Stack from '@mui/material/Stack';
import styles from '../../styles/Layout.module.scss';
import errorStyle from '../../styles/organisms/Error.module.scss';
import { useRouter } from 'next/router';

const NotPageTemplate = () => {
  const router = useRouter();
  const handleClickLogin = () => {
    router.replace('/');
  };
  return (
    <Layout title="error">
      <div className={styles.center}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <h1 className={errorStyle.status}>Sorry, page not found!</h1>
          <p className={errorStyle.message}>このページはすでに削除されているか、URLが間違っている可能性があります</p>
          <div className={errorStyle.button}>
            <a onClick={handleClickLogin}>トップへ戻る</a>
          </div>
        </Stack>
      </div>
    </Layout>
  );
};
export default NotPageTemplate;
