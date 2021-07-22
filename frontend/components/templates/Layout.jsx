import Head from "next/head";
import Link from "next/link";

const Layout = (props) => {
  const { title, children } = props;
  const siteTile = "Tripoon";

  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTile}` : siteTile}</title>
        <link rel="icon" href="/fabicon.ico" />
      </Head>

      <div className="parent">
        <div className="children">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
