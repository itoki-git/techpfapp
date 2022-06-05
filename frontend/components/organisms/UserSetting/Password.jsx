import React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import style from '../../../styles/organisms/UserSetting/Profile.module.scss';
import { Input } from '../../atoms/Input';
const Password = () => {
  return (
    <Paper elevation={0} className={settingStyle.paper}>
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
