import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useRecoilValue } from 'recoil';

import { getUserInfo } from '../../pages/api/userAPI';
import Menu from '../molecules/Menu';
import { menuState } from '../state/createStore';
import Articles from './UserSetting/Articles';
import Likes from './UserSetting/Likes';
import Mypage from './UserSetting/Profile';
import Skills from './UserSetting/Skills';

const UserSeting = () => {
  const menuStateValue = useRecoilValue(menuState);
  getUserInfo();
  const changePage = () => {
    switch (menuStateValue) {
      case 0:
        return <Mypage />;
      case 1:
        return <Skills />;
      case 2:
        return <Articles />;
      case 3:
        return <Likes />;
    }
  };
  return (
    <Container>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Menu />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          {changePage()}
        </Grid>
      </Grid>
    </Container>
  );
};
export default UserSeting;
