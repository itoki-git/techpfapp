import React from 'react';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';

export const LikeButton = (props) => {
  return (
    <Checkbox
      checked={props.isChecked}
      onChange={props.handleLikeButton}
      icon={<FavoriteBorder fontSize="large" />}
      checkedIcon={<Favorite fontSize="large" style={{ color: 'red' }} />}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};
