import React from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import UserSeting from '../components/organisms/UserSetting';

const CreatePage = () => {
  return (
    <PrivateLayout title="setting">
      <UserSeting />
    </PrivateLayout>
  );
};
export default CreatePage;
