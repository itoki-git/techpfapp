import React, { useMemo } from 'react';
import EditHeader from '../components/organisms/editHeader';
import { createIDState } from '../components/state/createStore';
import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import Container from '@mui/material/Container';
import Layout from '../components/templates/Layout';
import { Protected } from './api/userAPI';

const CreatePage = () => {
  const Create = dynamic(() => import('../components/organisms/Create'), { ssr: false });
  const setCreateIDState = useSetRecoilState(createIDState);

  Protected();

  useMemo(() => {
    setCreateIDState(uuidv4());
  }, []);

  return (
    <div>
      <EditHeader />
      <Layout title="create">
        <Container>
          <Create />
        </Container>
      </Layout>
    </div>
  );
};
export default CreatePage;
