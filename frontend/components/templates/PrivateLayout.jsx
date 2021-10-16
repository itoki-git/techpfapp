import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import useSWR from "swr";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "../organisms/Header";
import { loginState } from "../state/currentUser";
import styles from "../../styles/Layout.module.scss";
import { headerMenuState } from "../state/componentStore";
import { url, api } from "../../pages/api/utility";

const PrivateLayout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";
  const [isLogin, setLoginState] = useRecoilState(loginState);
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error } = useSWR(api.user, fetcher);
  const header = useRecoilValue(headerMenuState);

  if (!data || error) {
    setLoginState(false);
    Router.push(url.login);
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
        <Header menus={header} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
export default PrivateLayout;
