import React, { useContext, useMemo } from 'react';
import Container from '@mui/material/Container';
import Menu from '../molecules/Menu';
import Grid from '@mui/material/Grid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menuState, stateName, textStateFamily, topicListState } from '../state/createStore';
import { AuthContext } from '../../components/state/AuthStore';
import Typography from '@mui/material/Typography';
import Mypage from './UserSetting/Profile';
import styles from '../../styles/organisms/UserSetting.module.scss';
import Skills from './UserSetting/Skills';
import Password from './UserSetting/Password';
import Articles from './UserSetting/Articles';
import Likes from './UserSetting/Likes';
import WatchLater from './UserSetting/WatchLater';
import { getUserInfo, useGetLoginUserProfile } from '../../pages/api/userAPI';

const UserSeting = (props) => {
  const menuStateValue = useRecoilValue(menuState);
  getUserInfo();
  const changePage = () => {
    switch (menuStateValue) {
      case 0:
        return <Mypage />;
      case 1:
        return <Skills />;
      case 2:
        return <Password />;
      case 3:
        return <Articles />;
      case 4:
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
