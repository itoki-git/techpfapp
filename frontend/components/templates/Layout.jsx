import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../state/currentUser';
import { headerMenuState } from '../state/componentStore';
import styles from '../../styles/Layout.module.scss';
import Header from '../organisms/Header';
import { api } from '../../pages/api/utility';

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = 'Tripoon';
  const [isLogin, setLoginState] = useRecoilState(loginState);
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error } = useSWR(api.user, fetcher);
  const header = useRecoilValue(headerMenuState);

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
        <div className={styles.header}>
          <Header menus={header} />
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
