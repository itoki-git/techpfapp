import React, { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userState } from '../state/currentUser';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { api, publicMenu, url } from '../../pages/api/utility';
import useUser, { Protected } from '../../pages/api/userAPI';

const privateMenu = [
  { id: '1', displayName: 'HOME', to: url.article + '?page=1' },
  { id: '2', displayName: 'CREATE', to: url.create },
  { id: '3', displayName: 'DEMO', to: url.demo },
  { id: '4', displayName: 'MYPAGE', to: url.setting },
];

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = 'PORTFOLIO';
  const router = useRouter();
  const pathName = router.pathname;
  const { user, loading, loggedOut, mutate } = useUser();
  let menuList = loggedOut ? publicMenu : privateMenu;

  return (
    <div className={styles.page}>
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>
      {loading ? (
        'loading...'
      ) : (
        <div className={styles.parent}>
          <Header menus={menuList} />
          <Container className={styles.children}>{children}</Container>
        </div>
      )}
    </div>
  );
};
export default Layout;
