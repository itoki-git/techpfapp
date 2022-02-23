import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Input } from '../../atoms/Input';
import style from '../../../styles/organisms/UserSetting/Profile.module.scss';
import Paper from '@mui/material/Paper';
import { Textarea } from '../../atoms/Textarea';
import { AuthContext } from '../../../components/state/AuthStore';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import { stateName, textStateFamily } from '../../state/createStore';
import { useRecoilValue } from 'recoil';
const Mypage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const userName = useRecoilValue(textStateFamily(stateName.userName));

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
                  <h5>{userName}</h5>
                  <small className={style.jobName}>{state.jobname}</small>
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
              <label className={settingStyle.labelName} htmlFor={stateName.userName}>
                Name<span className={style.highlight}>*</span>
              </label>
              <Input
                id={stateName.userName}
                stateId={stateName.userName}
                component="profile"
                type="text"
                placeholder="Name"
                row={1}
              />
            </div>
            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor={stateName.jobName}>
                Job Title
              </label>
              <Input
                id={stateName.jobName}
                stateId={stateName.jobName}
                component="profile"
                type="text"
                placeholder="Job Title"
                row={1}
              />
            </div>
            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor={stateName.bio}>
                About Me / Bio
              </label>
              <Textarea
                id={stateName.bio}
                stateId={stateName.bio}
                component="bio"
                placeholder="About Me / Bio"
                row={8}
              />
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
