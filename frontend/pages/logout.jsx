import React from 'react';
import Logout from '../components/organisms/Logout';
import PrivateLayout from '../components/templates/PrivateLayout';

const LogoutPage = () => {
  return (
    <PrivateLayout title="logout">
      <Logout />
    </PrivateLayout>
  );
};
export default LogoutPage;
