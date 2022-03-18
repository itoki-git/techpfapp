import React from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import UserSeting from '../components/organisms/UserSetting';
import Layout from '../components/templates/Layout';
import { Protected } from './api/userAPI';

const CreatePage = () => {
  Protected();
  return (
    <Layout title="setting">
      <UserSeting />
    </Layout>
  );
};
export default CreatePage;
