import Head from "next/head";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/currentUser";
import { headerMenuState } from "../../pages/api/componentStore";
import styles from "../../styles/Layout.module.scss";
import Header from "../organisms/Header";
import axios from "axios";
import useSWR from "swr";

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";
  const header = useRecoilValue(headerMenuState);
  const isLogin = useRecoilValue(loginState);

  console.log("public:" + isLogin);

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
export default Layout;
