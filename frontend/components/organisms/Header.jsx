import Nav from "../molecules/Nav";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import styles from "../../styles/organisms/Header.module.scss";
import { useState } from "react";

// ヘッダー
const Header = (props) => {
  const [click, setClick] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>TriPoon</div>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <Nav menus={props.menus} style="nav" button="navInActive" />
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <IconButton onClick={() => setClick(!click)}>
          {click ? (
            <CloseIcon className={styles.close} fontSize="large" />
          ) : (
            <MenuIcon className={styles.menu} fontSize="large" />
          )}
        </IconButton>
        <Nav
          menus={props.menus}
          style="smallNav"
          active={click ? "active" : ""}
          button={click ? "navActive" : "navInActive"}
        />
      </Box>
    </div>
  );
};
export default Header;
