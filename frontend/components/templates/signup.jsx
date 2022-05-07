import React from 'react';
import Layout from './Layout';
import Signup from '../organisms/Signup';
import styles from '../../styles/Layout.module.scss';
const SignupTemplate = () => {
  return (
    <Layout title="signup">
      <div className={styles.center}>
        <Signup />
      </div>
    </Layout>
  );
};
export default SignupTemplate;
