import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/organisms/Header.module.scss';
import { DialogSlide } from '../molecules/Dialog';
import { useRouter } from 'next/router';
import { url } from '../../pages/api/utility';
import { usePublishArticle } from '../../pages/api/articleAPI';
import { useRecoilValue } from 'recoil';
import { createIDState, stateName, textStateFamily } from '../state/createStore';

// ヘッダー
const EditHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createID = useRecoilValue(createIDState);
  const titleValue = useRecoilValue(textStateFamily(createID + stateName.title));
  const submit = usePublishArticle(createID);

  const dialogAction = () => {
    setOpen(!open);
  };

  const publishArticle = async (e) => {
    console.log('AAAA');
    e.preventDefault();
    const result = await submit();
    console.log(result);
    if (result) {
      router.push(url.setting);
    } else {
      console.log('falied');
    }
  };
  return (
    <div className={styles.header}>
      <IconButton onClick={() => router.push(url.setting)}>
        <FontAwesomeIcon icon={faChevronLeft} />
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
              <FontAwesomeIcon icon={faSliders} />
            </IconButton>

            <Button className={styles.saveButton} disabled={!titleValue} onClick={(e) => publishArticle(e)}>
              公開する
            </Button>
          </Stack>
        </Box>
        <DialogSlide createID={createID} click={open} dialogAction={dialogAction} />
      </div>
    </div>
  );
};
export default EditHeader;
