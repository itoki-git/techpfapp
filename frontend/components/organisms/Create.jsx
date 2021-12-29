import React from 'react';
import { useRecoilValue } from 'recoil';
import { editState, textStateFamily } from '../state/createStore';
import { SideButton } from '../molecules/SideButton';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Editor } from '../molecules/Editor';
import { Stack } from '@mui/material';
import { Preview } from './Preview';

const Create = () => {
  const id = 'create';
  const isEdit = useRecoilValue(editState);
  const markdown = useRecoilValue(textStateFamily(id));
  return (
    <form>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        <div style={{ width: '100%' }}>
          <Container maxWidth="md">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 1, sm: 1, md: 2 }}
            >
              {isEdit ? <Editor id={id} /> : <Preview markdown={markdown} />}
              <SideButton id="create" />
            </Stack>
          </Container>
        </div>
      </Grid>
    </form>
  );
};
export default Create;
