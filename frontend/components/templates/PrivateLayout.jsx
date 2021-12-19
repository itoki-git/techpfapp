import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../organisms/Header';
import styles from '../../styles/Layout.module.scss';
import { url, api, privateMenu } from '../../pages/api/utility';
import { AuthContext } from '../state/AuthStore';
import Loading from '../organisms/Load';

const PrivateLayout = (props) => {
  const { title, children } = props;
  const siteTile = 'Tripoon';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const isReady = router.isReady;

  useEffect(() => {
    (async () => {
      const getName = async () => {
        const response = await axios
          .post('/api/user', {
            withCredentials: true,
          })
          .then((res) => {
            dispatch({
              type: 'GET_NAME',
              payload: res.data.name,
            });
            dispatch({
              type: 'GET_EMAIL',
              payload: res.data.email,
            });
            dispatch({
              type: 'GET_SHORT_PROFILE',
              payload: res.data.shortProfile,
            });
            dispatch({
              type: 'GET_PROFILE',
              payload: res.data.profile,
            });
            dispatch({
              type: 'LOGIN_STATUS',
              payload: true,
            });
          })
          .catch(() => {
            dispatch({
              type: 'LOGIN_STATUS',
              payload: false,
            });
          });
      };

      if (isReady) {
        await getName();
        setLoading(true);
      }
    })();
  }, [isReady, state.name]);

  if (!loading) {
    return <Loading loading={!loading} />;
  }

  // loginページに遷移
  if (!state.isLogin) {
    router.push(url.login);
  }

  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className={styles.parent}>
        <Header menus={privateMenu} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
export default PrivateLayout;
