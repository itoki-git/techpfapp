import Nav from "../molecules/Nav";
import Image from "next/image";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import styles from "../../styles/organisms/Header.module.scss";
import { useState } from "react";

// ヘッダー
const Header = (props) => {
  const [click, setClick] = useState(false);
  const menus = [
    { displayName: "Logout", to: "/logout" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.logo}>TriPoon</div>
      <Hidden smDown>
        <Nav menus={menus} style="nav" button="navInActive" />
      </Hidden>
      <Hidden mdUp>
        <IconButton onClick={() => setClick(!click)}>
          {click ? (
            <CloseIcon className={styles.close} fontSize="large" />
          ) : (
            <MenuIcon className={styles.menu} fontSize="large" />
          )}
        </IconButton>
        <Nav
          menus={menus}
          style="smallNav"
          active={click ? "active" : ""}
          button={click ? "navActive" : "navInActive"}
        />
      </Hidden>
    </div>
  );
};
export default Header;
