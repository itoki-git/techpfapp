import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { skillsItems } from '../../pages/api/icon';
import buttonStyle from '../../styles/atoms/Button.module.scss';
import skillStyle from '../../styles/atoms/CardWithIcon.module.scss';
import cardListStyle from '../../styles/molecules/TopicCardList.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import inputStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import { CardWithAddIcon, CardwithIcon } from '../atoms/CardWithIcon';
import { Input } from '../atoms/Input';
import { dialogState, stateName, textStateFamily, topicListState } from '../state/createStore';
import { TopicSelectdList } from './TopicCardList';

export const DialogSlide = (props) => {
  const { createID } = props;
  const listItems = skillsItems;
  const selectTopics = useRecoilValue(topicListState(createID + stateName.selectedTopicsID));
  const isOpen = useRecoilValue(dialogState(createID + stateName.editTopic));
  return (
    <Dialog open={props.click} fullWidth="true" maxWidth="md" keepMounted onClose={props.click === false}>
      <DialogTitle>{'Setting'}</DialogTitle>
      <Stack direction="column" spacing={2}>
        <DialogContent className={inputStyle.infoarea}>
          <div className={inputStyle.inputarea}>
            <label className={inputStyle.labelName} htmlFor="username">
              Title<span className={inputStyle.highlight}>*</span>
            </label>
            <Input
              id={createID + stateName.title}
              stateId={createID + stateName.title}
              component="profile"
              type="text"
              placeholder="Title"
              row={1}
            />
          </div>
        </DialogContent>
        <DialogTitle>
          <h5 className={settingStyle.pageTitle}>Topics</h5>
        </DialogTitle>
        <Grid container className={cardListStyle.cardList}>
          {selectTopics.map((skill, i) => (
            <Grid item sm={4} className={skillStyle.box} key={i}>
              <CardwithIcon skill={skill} />
            </Grid>
          ))}
          <CardWithAddIcon title="Edit Item" description="Edit topic item" id={createID + stateName.editTopic} />
        </Grid>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={buttonStyle.buttonRoot}>
            <button className={buttonStyle.update} onClick={props.dialogAction}>
              保存する
            </button>
          </div>
        </DialogActions>
      </Stack>
      <DialogFullScreen createID={createID} click={isOpen} listItems={listItems} />
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogFullScreen = (props) => {
  const { listItems, createID } = props;
  const setisOpen = useSetRecoilState(dialogState(createID + stateName.editTopic));
  const searchValue = useRecoilValue(textStateFamily(createID + stateName.topicSearchID));
  const [topicList, setTopicList] = useState(listItems);
  const [selectList, setSelectList] = useRecoilState(topicListState(createID + stateName.selectedTopicsID));
  useEffect(() => {
    const result = listItems.filter((topic) => topic.iconName.toUpperCase().startsWith(searchValue.toUpperCase()));
    if (result === []) {
      setTopicList(listItems);
    } else {
      setTopicList(result);
    }
  }, [searchValue]);

  const handleSelectTopic = (item) => {
    // selectListに選択されたアイテムがあるか
    const arrayExists = selectList.find((listItem) => listItem.id === item.id);

    // なければ追加、あれば選択されたものを削除
    if (arrayExists === undefined) {
      setSelectList([...selectList, item]);
    } else {
      const deleteTopic = selectList.filter((listItem) => listItem.id !== item.id);
      setSelectList(deleteTopic);
    }
  };

  const saveTopic = () => {
    setisOpen(false);
  };

  return (
    <Dialog fullScreen open={props.click} onClose={props.click === false} TransitionComponent={Transition}>
      <Container maxWidth="md">
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <DialogContent className={inputStyle.infoarea}>
            <div className={inputStyle.inputarea}>
              <Input
                id={createID + stateName.topicSearchID}
                stateId={createID + stateName.topicSearchID}
                component="searchBox"
                type="text"
                placeholder="トピックスを入力..."
                row={1}
              />
            </div>
          </DialogContent>
          <DialogContent className={inputStyle.infoarea}>
            <TopicSelectdList listItems={topicList} selectList={selectList} handleSelectTopic={handleSelectTopic} />
          </DialogContent>
          <DialogActions>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={buttonStyle.buttonRoot}>
                <button className={buttonStyle.daialogUpdate} onClick={saveTopic}>
                  保存する
                </button>
              </div>
            </div>
          </DialogActions>
        </Stack>
      </Container>
    </Dialog>
  );
};

export const AlertDialog = (props) => {
  return (
    <Dialog open={props.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          削除しようとしています。削除された記事は戻すことができません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleAlertClose()}>キャンセル</Button>
        <Button variant="contained" color="error" onClick={(e) => props.remove(e)}>
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
