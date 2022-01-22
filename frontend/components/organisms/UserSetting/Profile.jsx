import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Input } from '../../atoms/Input';
import style from '../../../styles/organisms/UserSetting/Profile.module.scss';
import Paper from '@mui/material/Paper';
import { Textarea } from '../../atoms/Textarea';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
const Mypage = () => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    username: '',
    weightRange: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Paper elevation={1} className={settingStyle.paper}>
      <h5 className={settingStyle.pageTitle}>User Profile</h5>
      <div style={{ marginTop: '1rem' }}>
        <Stack spacing={{ xs: 1, sm: 1, md: 2 }}>
          <div className={style.infoarea}>
            <div className={style.displayInfo}>
              <div className={style.left}>
                <Avatar alt="Remy Sharp" src="/DSC_9314.JPG" sx={{ width: 100, height: 100 }} />
                <div style={{ marginLeft: '1rem' }}>
                  <h5>Name</h5>
                  <small className={style.jobName}>Job / UI UX Designer</small>
                </div>
              </div>
              <div className={style.right}>
                <div className={settingStyle.cancelButton}>
                  <a href="">Cancel</a>
                </div>
                <div className={settingStyle.updateButton}>
                  <a href="">Save</a>
                </div>
              </div>
            </div>

            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor="username">
                Name<span className={style.highlight}>*</span>
              </label>
              <Input id="username" stateId="username" component="profile" type="text" placeholder="Name" row={1} />
            </div>
            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor="jobtitle">
                Job Title
              </label>
              <Input id="jobtitle" stateId="jobtitle" component="profile" type="text" placeholder="Job Title" row={1} />
            </div>
            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor="bio">
                About Me / Bio
              </label>
              <Textarea id="bio" stateId="bio" component="bio" placeholder="About Me / Bio" row={8} />
            </div>
          </div>
          <div>
            <Divider variant="middle" className={settingStyle.divider} />
          </div>
          <div className={settingStyle.deleteButton}>
            <a href="">Delete your account</a>
          </div>
        </Stack>
      </div>
    </Paper>
  );
};
export default Mypage;
