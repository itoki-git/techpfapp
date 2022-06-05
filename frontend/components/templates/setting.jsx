import React from 'react';

import Container from '@mui/material/Container';

import { Protected } from '../../pages/api/userAPI';
import UserSeting from '../organisms/UserSetting';
import Layout from './Layout';

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
