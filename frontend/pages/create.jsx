import React from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import Create from '../components/organisms/Create';

const CreatePage = () => {
  return (
    <PrivateLayout title="create">
      <Create />
    </PrivateLayout>
  );
};
export default CreatePage;
