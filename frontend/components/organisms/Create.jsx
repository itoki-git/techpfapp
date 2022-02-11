import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { editState, stateName, textStateFamily } from '../state/createStore';
import { SideButton } from '../molecules/SideButton';
import { Editor } from '../molecules/Editor';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import { Preview } from './Preview';
import { useUploadFIle } from '../../pages/api/utility';
import { Fab } from '@mui/material';

const Create = () => {
  const isEdit = useRecoilValue(editState);
  const [markdown, setMarkdown] = useRecoilState(textStateFamily(stateName.create));

  const insertInButton = async (e) => {
    let inner = await useUploadFIle(e);
    inner = '![](' + inner + ')';
    const marparea = document.getElementById('create');
    const sentence = marparea.value;
    const index = marparea.selectionStart;
    marparea.value = sentence.substr(0, index) + inner + sentence.substr(index, sentence.length);
    marparea.focus();
    const newCaret = index + inner.length;
    marparea.setSelectionRange(newCaret, newCaret);
    setMarkdown(marparea.value);
  };

  return (
    <form>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        <div style={{ width: '100%' }}>
          <Container maxWidth="md">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="flex-end"
              spacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => insertInButton(e)}
              />
              <label htmlFor="icon-button-file">
                <Fab aria-label="upload picture" component="span">
                  <ImageIcon />
                </Fab>
              </label>

              {isEdit ? (
                <Editor stateId={stateName.create} id={stateName.create} />
              ) : (
                <Preview markdown={markdown} id={stateName.create} />
              )}
              <div style={{ paddingBottom: '5rem' }}>
                <SideButton id="create" />
              </div>
            </Stack>
          </Container>
        </div>
      </Grid>
    </form>
  );
};
export default Create;
