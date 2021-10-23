import React from 'react';
import Layout from '../components/templates/Layout';
import Login from '../components/organisms/Login';
import Container from '@mui/material/Container';

const LoginPage = () => {
  return (
    <Layout title="login">
      <Container maxWidth="sm">
        <Login />
      </Container>
    </Layout>
  );
};
export default LoginPage;
