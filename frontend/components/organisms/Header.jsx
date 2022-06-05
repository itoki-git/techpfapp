import React, { useState } from 'react';

import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { usePublishArticle } from '../../pages/api/articleAPI';
import { url } from '../../pages/api/utility';
import styles from '../../styles/organisms/Header.module.scss';
import { MessageSnackbar } from '../atoms/MessageBar';
import { DialogSlide } from '../molecules/Dialog';
import Nav from '../molecules/Nav';
import { createIDState, stateName, textStateFamily } from '../state/createStore';

// 通常のヘッダー
const NormalHeader = (props) => {
  const [click, setClick] = useState(false); // closeボタン制御

  return (
    <div className={styles.header}>
      <Link href="/" as={`/`}>
        <a className={styles.logo}>
          <Image src="/logo_transparent.png" width={100} height={100} objectFit="contain" />
          <h4>techpfapp</h4>
        </a>
      </Link>

      <div>
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
        >
          <Nav menus={props.menus} style="nav" button="navInActive" />
        </Box>
        <Box
          sx={{
            display: {
              xs: 'block',
              sm: 'block',
              md: 'none',
              lg: 'none',
              xl: 'none',
            },
          }}
        >
          <IconButton onClick={() => setClick(!click)} style={{ cursor: 'pointer' }}>
            {click ? (
              <CloseIcon className={styles.close} fontSize="large" />
            ) : (
              <MenuIcon className={styles.menu} fontSize="large" />
            )}
          </IconButton>
          <Nav
            menus={props.menus}
            style="smallNav"
            active={click ? 'active' : ''}
            button={click ? 'navActive' : 'navInActive'}
          />
        </Box>
      </div>
    </div>
  );
};

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
      <IconButton onClick={() => router.push(url.setting)} style={{ cursor: 'pointer' }}>
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
            <IconButton onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
              <SettingsOutlinedIcon />
            </IconButton>

            <Button
              className={styles.saveButton}
              disabled={!titleValue}
              onClick={(e) => publishArticle(e)}
              style={{ cursor: 'pointer' }}
            >
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

const Header = (props) => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <>{pathName === url.create ? <EditHeader /> : <NormalHeader className={styles.header} menus={props.menus} />}</>
  );
};
export default Header;
