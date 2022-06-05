import React from 'react';

import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';

import buttonStyle from '../../styles/atoms/Button.module.scss';
import styles from '../../styles/Layout.module.scss';
import errorStyle from '../../styles/organisms/Error.module.scss';
import Layout from './Layout';

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
          <div className={buttonStyle.buttonRoot}>
            <button className={buttonStyle.errorback} onClick={handleClickLogin}>
              トップへ戻る
            </button>
          </div>
        </Stack>
      </div>
    </Layout>
  );
};
export default NotPageTemplate;
