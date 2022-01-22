import React, { useState } from 'react';
import style from '../../../styles/organisms/UserSetting/Skills.module.scss';
import Paper from '@mui/material/Paper';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import CardList from '../CardList';

const WatchLater = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div elevation={1} className={settingStyle.paper}>
      <h5 className={settingStyle.pageTitle}>Watch Later</h5>
      <CardList />
    </div>
  );
};
export default WatchLater;
