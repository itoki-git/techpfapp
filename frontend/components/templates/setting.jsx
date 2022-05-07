import React from 'react';
import UserSeting from '../organisms/UserSetting';
import Layout from './Layout';
import Container from '@mui/material/Container';
import { Protected } from '../../pages/api/userAPI';

const SettingTemplate = () => {
  Protected();

  return (
    <Layout title="setting">
      <Container>
        <UserSeting />
      </Container>
    </Layout>
  );
};
export default SettingTemplate;
