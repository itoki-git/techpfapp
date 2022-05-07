import React from 'react';
import Layout from './Layout';
import Login from '../organisms/Login';
import styles from '../../styles/Layout.module.scss';

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
