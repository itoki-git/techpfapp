import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Layout.module.scss";
import Header from "../organisms/Header";

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";

  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className={styles.parent}>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
