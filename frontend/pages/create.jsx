import React from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import Create from '../components/organisms/Create';
import EditHeader from '../components/organisms/editHeader';
import { url, api, privateMenu } from '../pages/api/utility';

const CreatePage = () => {
  return (
    <div>
      <EditHeader menus={privateMenu} />
      <PrivateLayout title="create">
        <Create />
      </PrivateLayout>
    </div>
  );
};
export default CreatePage;
