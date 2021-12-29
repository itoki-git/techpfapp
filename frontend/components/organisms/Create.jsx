import React from 'react';
import Sidebar from './Sidebar';
import styles from '../../styles/ArticlePage.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { editState, textStateFamily } from '../state/createStore';
import { component, editComponent } from '../state/createComponent';
import { SideButton } from '../molecules/SideButton';
import { api } from '../../pages/api/utility';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useState } from 'react';
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
