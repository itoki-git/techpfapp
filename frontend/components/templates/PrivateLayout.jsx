import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import Header from "../organisms/Header";
import { loginState } from "../state/currentUser";
import styles from "../../styles/Layout.module.scss";
import {
  headerMenuState,
  headerValueState,
} from "../../pages/api/componentStore";

const PrivateLayout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";
  const [isLogin, setLoginState] = useRecoilState(loginState);
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error } = useSWR("/api/user", fetcher);
  const header = useRecoilValue(headerMenuState);

  if (!data || error) {
    setLoginState(false);
    return (
      <Link href="/login">
        <a>こちら</a>
      </Link>
    );
  } else {
    setLoginState(true);
  }
  console.log("private:" + isLogin);
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
