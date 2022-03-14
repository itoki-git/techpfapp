import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userState } from '../state/currentUser';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { api, publicMenu, url } from '../../pages/api/utility';
import useUser from '../../pages/api/userAPI';

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
  const { loading, loggedIn, user, mutate } = useUser();
  const currentUser = useRecoilValue(userState);

  const LoginOrInfo = () => {
    console.log(currentUser);
    if (loading) return null;
    if (loggedIn || currentUser) return <>{pathName !== url.create ? <Header menus={privateMenu} /> : ''}</>;
    if (!loggedIn) return <Header menus={publicMenu} />;
  };
  const DisplayInfo = () => {
    if (loading) return <div className="container"> Loading... </div>;
    if (loggedIn && user.nickname) return children;

    return <div className="container"> Login to get info </div>;
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className={styles.parent}>
        <LoginOrInfo />
        <Container className={styles.children}>{children}</Container>
      </div>
    </div>
  );
};
export default Layout;
