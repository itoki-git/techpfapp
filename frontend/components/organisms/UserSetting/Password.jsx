import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Input } from '../../atoms/Input';
import style from '../../../styles/organisms/UserSetting/Profile.module.scss';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
const Password = () => {
  return (
    <Paper elevation={1} className={settingStyle.paper}>
      <h5 className={settingStyle.pageTitle}>Change Your Password</h5>
      <Stack spacing={{ xs: 1, sm: 1, md: 2 }}>
        <div className={style.infoarea}>
          <div className={style.inputarea}>
            <label className={settingStyle.labelName} htmlFor="currentPassword">
              current password<span className={style.highlight}>*</span>
            </label>
            <Input
              id="currentPassword"
              stateId="currentPassword"
              component="profile"
              type="password"
              placeholder="Entter current password"
              row={1}
            />
          </div>
          <div className={style.inputarea}>
            <label className={settingStyle.labelName} htmlFor="newPssword">
              new password<span className={style.highlight}>*</span>
            </label>
            <Input
              id="newPssword"
              stateId="newPssword"
              component="profile"
              type="password"
              placeholder="Enter new password"
              row={1}
            />
          </div>
          <div className={style.inputarea}>
            <label className={settingStyle.labelName} htmlFor="confirmPassword">
              confirm password<span className={style.highlight}>*</span>
            </label>
            <Input
              id="confirmPassword"
              stateId="confirmPassword"
              component="profile"
              type="password"
              placeholder="Confirm new password"
              row={1}
            />
          </div>
        </div>
        <div className={settingStyle.updateButton}>
          <a href="">Save</a>
        </div>
      </Stack>
    </Paper>
  );
};
export default Password;