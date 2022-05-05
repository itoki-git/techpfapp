import React from 'react';
import Layout from '../components/templates/Layout';
import Login from '../components/organisms/Login';
import styles from '../styles/Layout.module.scss';

const LoginPage = () => {
  return (
    <Layout title="login">
      <div className={styles.center}>
        <Login />
      </div>
    </Layout>
  );
};
export default LoginPage;
