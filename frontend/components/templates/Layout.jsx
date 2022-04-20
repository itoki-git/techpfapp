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
import { api, privateMenu, publicMenu, url } from '../../pages/api/utility';
import { Protected, useUser } from '../../pages/api/userAPI';
import nookies, { parseCookies } from 'nookies';
import { NextPageContext } from 'next';

const Layout = (props, context) => {
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
          {pathName !== url.create ? <Header menus={menuList} /> : ''}
          <Container className={styles.children}>{children}</Container>
        </div>
      )}
    </div>
  );
};
export default Layout;
