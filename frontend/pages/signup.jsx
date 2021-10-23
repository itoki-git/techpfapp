import React from 'react';
import Layout from '../components/templates/Layout';
import Signup from '../components/organisms/Signup';
import Container from '@mui/material/Container';

const LoginPage = () => {
  return (
    <Layout title="signup">
      <Container maxWidth="sm">
        <Signup />
      </Container>
    </Layout>
  );
};
export default LoginPage;
