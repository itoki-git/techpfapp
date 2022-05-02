import React from 'react';
import Layout from '../components/templates/Layout';
import Signup from '../components/organisms/Signup';
import Container from '@mui/material/Container';
import styles from '../styles/Layout.module.scss';
const LoginPage = () => {
  return (
    <Layout title="signup">
      <div className={styles.auth}>
        <Signup />
      </div>
    </Layout>
  );
};
export default LoginPage;
