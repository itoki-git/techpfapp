import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRecoilState } from 'recoil';

import { userState, useUser } from '../../pages/api/userAPI';
import { privateMenu, publicMenu } from '../../pages/api/utility';
import styles from '../../styles/Layout.module.scss';
import { LinearLoad } from '../atoms/Loading';
import Header from '../organisms/Header';

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = 'techpfapp';
  const { loading, loggedOut } = useUser();
  const [isLogin, setIsLogin] = useRecoilState(userState);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (!loggedOut || isLogin) {
      setMenuList(privateMenu);
    } else {
      setMenuList(publicMenu);
    }
  }, [loggedOut, isLogin]);

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
