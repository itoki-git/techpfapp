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
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import { useRecoilState } from 'recoil';
import { menuState } from '../state/createStore';
import { useLogout } from '../../pages/api/utility';

const menuItems = [
  {
    name: 'User Info',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-user"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  },
  {
    name: 'Skils',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-diamond"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 5h12l3 5l-8.5 9.5a0.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
        <path d="M10 12l-2 -2.2l.6 -1" />
      </svg>
    ),
  },
  {
    name: 'Password',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-lock"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="16" r="1" />
        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    name: 'Articles',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-book"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <line x1="3" y1="6" x2="3" y2="19" />
        <line x1="12" y1="6" x2="12" y2="19" />
        <line x1="21" y1="6" x2="21" y2="19" />
      </svg>
    ),
  },
  {
    name: 'Likes',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
    ),
  },
  {
    name: 'Watch Later',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-bookmarks"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#666D73"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13 7a2 2 0 0 1 2 2v12l-5 -3l-5 3v-12a2 2 0 0 1 2 -2h6z" />
        <path d="M9.265 4a2 2 0 0 1 1.735 -1h6a2 2 0 0 1 2 2v12l-1 -.6" />
      </svg>
    ),
  },
];

const Menu = (props) => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(menuState);
  const logout = useLogout();
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
        <a onClick={logout}>Logout</a>
      </div>
    </Paper>
  );
};
export default Menu;
