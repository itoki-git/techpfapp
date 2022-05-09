import React from 'react';
import Head from 'next/head';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { privateMenu, publicMenu } from '../../pages/api/utility';
import { userState, useUser } from '../../pages/api/userAPI';
import { LinearLoad } from '../atoms/Loading';

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = 'PORTFOLIO';
  const { user, loading, loggedOut } = useUser();
  const [isLogin, setIsLogin] = useRecoilState(userState);
  let menuList = !loggedOut || isLogin ? privateMenu : publicMenu;

  // ログインの状態を保存
  setIsLogin(!loggedOut);

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
          <Header className={styles.header} menus={menuList} />
          <div className={styles.children}>{children}</div>
        </>
      )}
    </div>
  );
};
export default Layout;
