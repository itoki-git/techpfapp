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
        <Grid item xs={12} md={10}>
          <Container maxWidth="md">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
              {isEdit ? <Editor id={id} /> : <Preview markdown={markdown} />}
              <SideButton id="create" />
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </form>
  );
};
export default Create;
