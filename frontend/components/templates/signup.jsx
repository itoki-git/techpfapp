import React from 'react';

import styles from '../../styles/Layout.module.scss';
import Signup from '../organisms/Signup';
import Layout from './Layout';
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
