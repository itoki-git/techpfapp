import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Header from '../organisms/Header';
import styles from '../../styles/Layout.module.scss';
import { url, publicMenu } from '../../pages/api/utility';
import useUser, { useRequireLogin } from '../../pages/api/userAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stateName, textStateFamily, topicListState } from '../state/createStore';
import { skillsItems } from '../../pages/api/icon';
import { userState } from '../state/currentUser';

const PrivateLayout = (props) => {
  const currrntUser = useRecoilValue(userState);
  const { title, children } = props;
  const siteTile = 'Tripoon';
  const router = useRouter();
  const pathName = router.pathname;
  const privateMenu = [
    { id: '1', displayName: 'HOME', to: url.article + '?page=1' },
    { id: '2', displayName: 'CREATE', to: url.create },
    { id: '3', displayName: 'DEMO', to: url.demo },
    { id: '4', displayName: 'MYPAGE', to: url.setting },
  ];
  const { user, loading, loggedIn } = useUser();

  const LoginOrInfo = () => {
    console.log('PrivateLayout', loggedIn);
    if (loading) return null;
    if (loggedIn) return <>{pathName !== url.create ? <Header menus={privateMenu} /> : ''}</>;
    if (!loggedIn) return <Header menus={publicMenu} />;
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
export default PrivateLayout;
