import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Input } from '../../atoms/Input';
import style from '../../../styles/organisms/UserSetting/Profile.module.scss';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Textarea } from '../../atoms/Textarea';
import Badge from '@mui/material/Badge';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import { stateName, textStateFamily } from '../../state/createStore';
import { MessageSnackbar } from '../../atoms/MessageBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUpdataProfile } from '../../../pages/api/userAPI';
import { useUploadFile } from '../../../pages/api/utility';
const Mypage = () => {
  const nickName = useRecoilValue(textStateFamily(stateName.nickName));
  const jobName = useRecoilValue(textStateFamily(stateName.jobName));
  const [userImage, setUserImage] = useRecoilState(textStateFamily(stateName.userImage));
  const updateProfile = useUpdataProfile();
  const s3url = useUploadFile();
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '更新できませんでした',
    severity: 'error',
  });

  // プロフィール(ユーザースキル)更新
  const handleSave = async (e) => {
    e.preventDefault();
    const isSuccess = await updateProfile(e);
    if (isSuccess) {
      setBarState({ ...barState, open: isSuccess, message: '更新しました', severity: 'success' });
    }
  };

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
  };

  const uploadImage = async (e) => {
    const getS3URL = await s3url(e);
    setUserImage(getS3URL);
  };

  return (
    <Paper elevation={0} className={settingStyle.paper}>
      <h5 className={settingStyle.pageTitle}>User Profile</h5>
      <div style={{ marginTop: '1rem' }}>
        <Stack spacing={{ xs: 1, sm: 1, md: 2 }}>
          <div className={style.infoarea}>
            <div className={style.displayInfo}>
              <div className={style.left}>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => uploadImage(e)}
                  />
                  <IconButton aria-label="upload picture" component="span">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      badgeContent={
                        <Avatar sx={{ width: 27, height: 27 }}>
                          <AddPhotoAlternateRoundedIcon fontSize="small" />
                        </Avatar>
                      }
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={userImage}
                        sx={{
                          width: { xs: 110, sm: 150, md: 150, lg: 150, xl: 150 },
                          height: { xs: 110, sm: 150, md: 150, lg: 150, xl: 150 },
                        }}
                      />
                    </Badge>
                  </IconButton>
                </label>
                <div style={{ marginLeft: '1rem' }}>
                  <h5 className={style.userName}>{nickName}</h5>
                  <small className={style.jobName}>{jobName}</small>
                </div>
              </div>
              <div className={style.right}>
                <div className={settingStyle.updateButton}>
                  <a href="" onClick={(e) => handleSave(e)}>
                    Save
                  </a>
                </div>
              </div>
            </div>

            <div className={style.inputarea}>
              <label className={settingStyle.labelName} htmlFor={stateName.nickName}>
                Name<span className={style.highlight}>*</span>
              </label>
              <Input
                id={stateName.nickName}
                stateId={stateName.nickName}
                component="profile"
                type="text"
                placeholder="ニックネーム"
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
        </Stack>
      </div>
      {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
    </Paper>
  );
};
export default Mypage;
