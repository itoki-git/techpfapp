import React, { useMemo } from 'react';

import Container from '@mui/material/Container';
import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { Protected } from '../../pages/api/userAPI';
import { createIDState } from '../state/createStore';
import Layout from './Layout';

const CreateTemplate = () => {
  const Create = dynamic(() => import('../organisms/Create'), { ssr: false });
  const setCreateIDState = useSetRecoilState(createIDState);

  Protected();

  useMemo(() => {
    setCreateIDState(uuidv4());
  }, []);

  return (
    <div>
      <Layout title="create">
        <Container>
          <Create />
        </Container>
      </Layout>
    </div>
  );
};
export default CreateTemplate;
