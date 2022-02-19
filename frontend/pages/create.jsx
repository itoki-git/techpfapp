import React, { useMemo } from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import EditHeader from '../components/organisms/editHeader';
import { api, createMenu, useGetUUID } from '../pages/api/utility';
import { createIDState } from '../components/state/createStore';
import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

const CreatePage = () => {
  const Create = dynamic(() => import('../components/organisms/Create'), { ssr: false });
  const setCreateIDState = useSetRecoilState(createIDState);
  const getPostID = useGetUUID();

  useMemo(() => {
    console.log('get create id');

    setCreateIDState(getPostID);
  }, []);

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
