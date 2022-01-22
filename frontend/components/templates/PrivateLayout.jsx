import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Container from '@mui/material/Container';
import Header from '../organisms/Header';
import styles from '../../styles/Layout.module.scss';
import { url, api, privateMenu, useIsLogin, useRequireLogin } from '../../pages/api/utility';
import { AuthContext } from '../state/AuthStore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../organisms/Load';

const PrivateLayout = (props) => {
  const { title, children } = props;
  const { state, dispatch } = useContext(AuthContext);
  const siteTile = 'Tripoon';
  const router = useRouter();
  const isReady = router.isReady;
  const pathName = router.pathname;

  useRequireLogin();

  return (
    <div className={styles.page}>
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className={styles.parent}>
        {pathName !== url.create ? <Header menus={privateMenu} /> : ''}
        <Container className={styles.children}>{children}</Container>
      </div>
    </div>
  );
};
export default PrivateLayout;
