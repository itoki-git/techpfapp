import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState } from 'recoil';

import { FabButton } from '../atoms/FabButton';
import { editState } from '../state/createStore';

const fabColorStyle = {
  color: 'common.black',
  bgcolor: '#fff',
  '&:hover': {
    bgcolor: '#f2f2f2',
  },
};

export const SideButton = () => {
  const [isEdit, setEditState] = useRecoilState(editState);

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
        <Fab
          sx={fabColorStyle}
          aria-label="Expand"
          color="inherit"
          component="span"
          onClick={changeEditState}
          style={{ cursor: 'pointer' }}
        >
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
