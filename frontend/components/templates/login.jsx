import React from 'react';

import styles from '../../styles/Layout.module.scss';
import Login from '../organisms/Login';
import Layout from './Layout';

const LoginTemplate = () => {
  return (
    <Layout title="login">
      <div className={styles.center}>
        <Login />
      </div>
    </Layout>
  );
};
export default LoginTemplate;
