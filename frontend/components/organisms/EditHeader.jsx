import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../../styles/organisms/Header.module.scss';
import { DialogSlide } from '../molecules/Dialog';
import { useRouter } from 'next/router';
import { url } from '../../pages/api/utility';
import { usePublishArticle } from '../../pages/api/articleAPI';
import { useRecoilValue } from 'recoil';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { createIDState, stateName, textStateFamily } from '../state/createStore';
import { MessageSnackbar } from '../atoms/MessageBar';

// ヘッダー
const EditHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createID = useRecoilValue(createIDState);
  const titleValue = useRecoilValue(textStateFamily(createID + stateName.title));
  const submit = usePublishArticle(createID);
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'error',
  });

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
  };

  const dialogAction = () => {
    setOpen(!open);
  };

  const publishArticle = async (e) => {
    e.preventDefault();
    const result = await submit();
    if (result) {
      setBarState({ ...barState, open: true, message: '記事を投稿しました', severity: 'success' });
      router.push(url.setting);
    } else {
      setBarState({ ...barState, open: true, message: '記事の投稿が失敗しました', severity: 'error' });
    }
  };
  return (
    <div className={styles.header}>
      <IconButton onClick={() => router.push(url.setting)}>
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <div>
        <Box
          sx={{
            display: {
              xs: 'block',
              sm: 'block',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <IconButton onClick={() => setOpen(!open)}>
              <SettingsOutlinedIcon />
            </IconButton>

            <Button className={styles.saveButton} disabled={!titleValue} onClick={(e) => publishArticle(e)}>
              公開する
            </Button>
          </Stack>
        </Box>
        <DialogSlide createID={createID} click={open} dialogAction={dialogAction} />
      </div>
      {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
    </div>
  );
};
export default EditHeader;
