import React from 'react';
import UserSeting from '../components/organisms/UserSetting';
import Layout from '../components/templates/Layout';
import Container from '@mui/material/Container';
import { Protected } from './api/userAPI';

const CreatePage = () => {
  Protected();

  return (
    <Layout title="setting">
      <Container>
        <UserSeting />
      </Container>
    </Layout>
  );
};
export default CreatePage;
