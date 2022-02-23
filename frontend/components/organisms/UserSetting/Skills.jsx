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
import { api, useUpdataProfile } from '../../../pages/api/utility';
import axios from 'axios';

const Skills = () => {
  const skillState = 'slillState';
  const [selectTopics, setSelectTopics] = useRecoilState(
    topicListState(stateName.userSkill + stateName.selectedTopicsID)
  );
  const isOpen = useRecoilValue(dialogState(stateName.userSkill + stateName.editTopic));
  const { state, dispatch } = useContext(AuthContext);
  const updateProfile = useUpdataProfile();

  const handleSave = async (e) => {
    const isSuccess = await updateProfile(e);
    console.log(isSuccess);
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
    </Paper>
  );
};
export default Skills;
