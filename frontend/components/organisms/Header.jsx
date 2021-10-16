import Nav from "../molecules/Nav";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import styles from "../../styles/organisms/Header.module.scss";
import { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";

// ヘッダー
const Header = (props) => {
  const [click, setClick] = useState(false); // closeボタン制御
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>TriPoon</div>
      <div>
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
        <IconButton
          id="user-menu"
          aria-controls="basic-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "user-menu",
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default Header;
