import Nav from "../molecules/Nav";
import Image from "next/image";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

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
      <div className={styles.logo}>TriPoon</div>
      <Hidden smDown>
        <Nav menus={menus} />
      </Hidden>
      <Hidden mdUp>
        <IconButton>
          <MenuIcon className={styles.icon} fontSize="large" />
        </IconButton>
      </Hidden>
    </div>
  );
};
export default Header;
