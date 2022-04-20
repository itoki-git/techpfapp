import React, { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import styles from '../../styles/molecules/Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGem, faLock, faBook, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import { useRecoilState } from 'recoil';
import { menuState } from '../state/createStore';
import { useLogout, useUser } from '../../pages/api/userAPI';
import { menuIconItems } from '../../pages/api/icon';
import { Router, useRouter } from 'next/router';
import { url } from '../../pages/api/utility';

const Menu = (props) => {
  const menuItems = menuIconItems;
  const [selectedIndex, setSelectedIndex] = useRecoilState(menuState);
  const logout = useLogout();
  const router = useRouter();
  const { mutate } = useUser();

  const handleClickLogout = async (e) => {
    e.preventDefault();
    await logout();
    mutate(null);
    router.replace(url.login);
  };
  return (
    <Paper elevation={1} className={styles.menuRoot}>
      <Stack direction="column" justifyContent="center" alignItems="flex-start">
        <Typography className={styles.menuTitle} sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          User Profile
        </Typography>
        {menuItems.map((item, i) => (
          <ListItem disablePadding key={i}>
            <ListItemButton
              className={styles.menuButton}
              selected={selectedIndex === i}
              onClick={() => setSelectedIndex(i)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
      <Divider variant="middle" className={settingStyle.divider} />
      <div className={settingStyle.logoutButton}>
        <a onClick={(e) => handleClickLogout(e)}>Logout</a>
      </div>
    </Paper>
  );
};
export default Menu;
