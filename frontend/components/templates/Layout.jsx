import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import Container from '@mui/material/Container';
import { useRecoilState } from 'recoil';
import { loginState } from '../state/currentUser';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { api, publicMenu } from '../../pages/api/utility';

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = 'Tripoon';
  const [isLogin, setLoginState] = useRecoilState(loginState);
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error } = useSWR(api.user, fetcher);

  if (!data || error) {
    setLoginState(false);
  } else {
    setLoginState(true);
  }

  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className={styles.parent}>
        <Header menus={publicMenu} />
        <Container className={styles.children}>{children}</Container>
      </div>
    </div>
  );
};
export default Layout;
