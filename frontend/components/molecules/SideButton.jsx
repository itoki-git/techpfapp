import React from 'react';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import { Input } from '@mui/material';

const fabColorStyle = {
  color: 'common.black',
  bgcolor: '#fff',
  '&:hover': {
    bgcolor: '#fff',
  },
};

export const SideButton = () => {
  const fabs = [
    {
      color: 'inherit',
      sx: { ...fabColorStyle },
      icon: <AddLinkIcon />,
      label: 'Expand',
    },
    {
      color: 'inherit',
      sx: { ...fabColorStyle },
      icon: <QuestionMarkIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <label htmlFor="icon-button-file">
        <Fab sx={fabColorStyle} aria-label="Expand" color="inherit" component="span">
          <Input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} />
          <ImageIcon />
        </Fab>
      </label>
      {fabs.map((fab, index) => (
        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
          {fab.icon}
        </Fab>
      ))}
    </Stack>
  );
};
