import React from 'react';
import Nav from '../molecules/Nav';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import styles from '../../styles/organisms/Header.module.scss';
import { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';

// ヘッダー
const EditHeader = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>TriPoon</div>
      <div>
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
        >
          <Nav menus={props.menus} style="nav" button="navInActive" />
        </Box>
      </div>
    </div>
  );
};
export default EditHeader;
