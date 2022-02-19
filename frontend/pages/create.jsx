import React from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import EditHeader from '../components/organisms/editHeader';
import { url, createMenu } from '../pages/api/utility';
import dynamic from 'next/dynamic';

const CreatePage = () => {
  const Create = dynamic(() => import('../components/organisms/Create'), { ssr: false });
  return (
    <div>
      <EditHeader menus={createMenu} />
      <PrivateLayout title="create">
        <Create />
      </PrivateLayout>
    </div>
  );
};
export default CreatePage;
