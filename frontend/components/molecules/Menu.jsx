import React from 'react';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { menuIconItems } from '../../pages/api/icon';
import { useLogout, userState } from '../../pages/api/userAPI';
import { url } from '../../pages/api/utility';
import buttonStyle from '../../styles/atoms/Button.module.scss';
import styles from '../../styles/molecules/Menu.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import { menuState } from '../state/createStore';

const Menu = () => {
  const menuItems = menuIconItems;
  const [selectedIndex, setSelectedIndex] = useRecoilState(menuState);
  const logout = useLogout();
  const router = useRouter();
  const setIsLogin = useSetRecoilState(userState);

  const handleClickLogout = async (e) => {
    e.preventDefault();
    let isLogout = await logout();
    if (isLogout) {
      setIsLogin(false);
      router.push(url.login);
    }
  };
  return (
    <Paper elevation={0} className={styles.menuRoot}>
      <Stack direction="column" justifyContent="center" alignItems="flex-start">
        <Typography className={styles.menuTitle} sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          User Profile
        </Typography>
        {menuItems.map((item, i) => (
          <ListItem disablePadding key={i} className={styles.menuItem}>
            <ListItemButton
              className={styles.menuButton}
              selected={selectedIndex === i}
              onClick={() => setSelectedIndex(i)}
              style={{ cursor: 'pointer' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
      <Divider variant="middle" className={settingStyle.divider} />
      <div className={buttonStyle.buttonRoot}>
        <button className={buttonStyle.logout} onClick={(e) => handleClickLogout(e)} style={{ cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </Paper>
  );
};
export default Menu;
