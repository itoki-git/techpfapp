import React, { useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { Input } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { textStateFamily, editState, stateName, createIDState } from '../state/createStore';
import { FabButton } from '../atoms/FabButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';
import { useInsertTextarea, useUploadFIle } from '../../pages/api/utility';

const fabColorStyle = {
  color: 'common.black',
  bgcolor: '#F2F2F2',
  '&:hover': {
    bgcolor: '#F2F2F2',
  },
};

export const SideButton = (props) => {
  const [isEdit, setEditState] = useRecoilState(editState);
  useEffect(() => {
    alert('Finished loading');
  }, []);

  // 編集とプレビューの切り替え
  const changeEditState = () => setEditState(!isEdit);
  const fabs = [
    {
      id: 'icon-button-file',
      color: 'inherit',
      sx: { ...fabColorStyle },
      label: 'upload picture',
      component: <ImageIcon />,
      name: '画像を挿入',
    },
  ];
  return (
    <Stack direction={{ xs: 'row', sm: 'column' }} justifyContent="center" alignItems="center" spacing={4}>
      <Tooltip title={isEdit ? 'プレビュー' : '編集'} arrow>
        <Fab sx={fabColorStyle} aria-label="Expand" color="inherit" component="span" onClick={changeEditState}>
          {isEdit ? <PlayArrowIcon /> : <EditIcon />}
        </Fab>
      </Tooltip>
      {fabs.map((fab, index) => (
        <FabButton id={fab.id} sx={fab.sx} name={fab.name} label={fab.label} color={fab.color} key={index}>
          {fab.component}
        </FabButton>
      ))}
    </Stack>
  );
};
