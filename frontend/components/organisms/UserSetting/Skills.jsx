import React, { useContext, useMemo, useState } from 'react';
import style from '../../../styles/atoms/CardWithIcon.module.scss';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import profileStyle from '../../../styles/organisms/UserSetting/Profile.module.scss';
import settingStyle from '../../../styles/organisms/UserSetting.module.scss';
import { CardWithAddIcon, CardwithIcon, CardwithIconEdit } from '../../atoms/CardWithIcon';
import { skillsItems } from '../../../pages/api/icon';
import { DialogFullScreen } from '../../molecules/Dialog';
import cardListStyle from '../../../styles/molecules/TopicCardList.module.scss';
import skillStyle from '../../../styles/atoms/CardWithIcon.module.scss';
import { dialogState, stateName, topicListState } from '../../state/createStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AuthContext } from '../../../components/state/AuthStore';
import axios from 'axios';
import { MessageSnackbar } from '../../atoms/MessageBar';
import { useUpdataProfile } from '../../../pages/api/userAPI';

const Skills = () => {
  const [selectTopics, setSelectTopics] = useRecoilState(
    topicListState(stateName.userSkill + stateName.selectedTopicsID)
  );
  const isOpen = useRecoilValue(dialogState(stateName.userSkill + stateName.editTopic));
  const updateProfile = useUpdataProfile();
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '更新できませんでした',
    severity: 'error',
  });

  // プロフィール(ユーザースキル)更新
  const handleSave = async (e) => {
    const isSuccess = await updateProfile(e);
    if (isSuccess) {
      setBarState({ ...barState, open: isSuccess, message: '更新しました', severity: 'success' });
    }
  };

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
  };

  return (
    <Paper elevation={1} className={settingStyle.paper}>
      <h5 className={settingStyle.pageTitle}>Skills</h5>
      <Grid container className={cardListStyle.cardList}>
        {selectTopics.map((skill, i) => (
          <Grid item sm={4} className={skillStyle.box} key={i}>
            <CardwithIcon skill={skill} />
          </Grid>
        ))}
        <CardWithAddIcon
          title="Edit skill item"
          description="Edit skill item"
          id={stateName.userSkill + stateName.editTopic}
        />
      </Grid>
      <DialogFullScreen createID={stateName.userSkill} click={isOpen} listItems={skillsItems} />

      <div className={settingStyle.updateButton}>
        <a href="" onClick={(e) => handleSave(e)}>
          Save
        </a>
      </div>
      {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
    </Paper>
  );
};
export default Skills;
