import React, { useMemo } from 'react';
import PrivateLayout from '../components/templates/PrivateLayout';
import EditHeader from '../components/organisms/editHeader';
import { createMenu } from '../pages/api/utility';
import { createIDState } from '../components/state/createStore';
import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const CreatePage = () => {
  const Create = dynamic(() => import('../components/organisms/Create'), { ssr: false });
  const setCreateIDState = useSetRecoilState(createIDState);

  useMemo(() => {
    console.log('get create id');

    setCreateIDState(uuidv4());
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
