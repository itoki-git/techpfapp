import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { privateMenu, publicMenu, url } from '../../pages/api/utility';
import { userState, useUser } from '../../pages/api/userAPI';
import { LinearLoad } from '../atoms/Loading';
import { loadingState } from '../state/createStore';

const Layout = (props, context) => {
  const { title, children } = props;
  const siteTile = 'PORTFOLIO';
  const router = useRouter();
  const pathName = router.pathname;
  const { user, loading, loggedOut, mutate } = useUser();
  let menuList = loggedOut ? publicMenu : privateMenu;
  const setIsLogin = useSetRecoilState(userState);

  // ログインの状態を保存
  setIsLogin(user !== undefined);

  return (
    <div className={styles.page}>
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>
      {loading ? (
        <LinearLoad />
      ) : (
        <>
          {pathName !== url.create ? <Header className={styles.header} menus={menuList} /> : ''}
          <div className={styles.children}>{children}</div>
        </>
      )}
    </div>
  );
};
export default Layout;
