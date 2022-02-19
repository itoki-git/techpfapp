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

// ヘッダー
const EditHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dialogAction = () => {
    console.log('AA');
    setOpen(!open);
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

            <Button className={styles.saveButton} disabled>
              公開する
            </Button>
          </Stack>
        </Box>
        <DialogSlide click={open} dialogAction={dialogAction} />
      </div>
    </div>
  );
};
export default EditHeader;
