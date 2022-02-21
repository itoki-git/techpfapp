import React from 'react';
import { useRecoilValue } from 'recoil';
import { createIDState, editState, stateName, textStateFamily } from '../state/createStore';
import { SideButton } from '../molecules/SideButton';
import { Editor } from '../molecules/Editor';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Preview } from './Preview';
import { useInsertTextarea, useUploadFile } from '../../pages/api/utility';

const Create = () => {
  const createID = useRecoilValue(createIDState);
  const isEdit = useRecoilValue(editState);
  const markdown = useRecoilValue(textStateFamily(createID + stateName.markdown));
  const s3url = useUploadFile();
  const insertMarkdown = useInsertTextarea(createID + stateName.markdown);

  const uploadImage = async (e) => {
    let inner = '';
    const getS3URL = await s3url(e);
    inner = '![](' + getS3URL + ')';
    insertMarkdown(inner);
  };

  return (
    <form>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        <div style={{ width: '100%' }}>
          <Container maxWidth="md">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems={{ xs: 'center', sm: 'flex-end' }}
              spacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => uploadImage(e)}
              />
              {isEdit ? (
                <Editor stateId={createID + stateName.markdown} id={createID + stateName.markdown} />
              ) : (
                <Preview markdown={markdown} />
              )}
              <div style={{ paddingBottom: '5rem' }}>
                <SideButton textState={createID + stateName.markdown} />
              </div>
            </Stack>
          </Container>
        </div>
      </Grid>
    </form>
  );
};
export default Create;
