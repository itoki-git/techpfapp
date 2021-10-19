import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../organisms/Header";
import { loginState } from "../state/currentUser";
import styles from "../../styles/Layout.module.scss";
import {
  headerMenuState,
  fetchState,
  loadState,
} from "../state/componentStore";
import { url, api } from "../../pages/api/utility";
import Loading from "../organisms/Load";

const PrivateLayout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";
  const [isLogin, setLoginState] = useRecoilState(loginState);
  const fetcher = (url) => axios.post(url).then((res) => res.data);
  const { data, error } = useSWR(api.user, fetcher);
  const header = useRecoilValue(headerMenuState);
  const router = useRouter();
  const isReady = router.isReady;

  if (!isReady || !data) {
    return <Loading />;
  }

  if (!data || error) {
    setLoginState(false);
    router.push(url.login);
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
