import Nav from "../molecules/Nav";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/Header.module.scss";

// ヘッダー
const Header = (props) => {
  const menus = [
    { displayName: "Logout", to: "/logout" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="">
          <Image src="/TriPoon.png" width={200} height={200} />
        </Link>
      </div>
      <Nav menus={menus} />
    </div>
  );
};
export default Header;
