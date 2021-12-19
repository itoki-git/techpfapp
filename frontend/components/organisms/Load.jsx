import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props) => {
  return (
    <div>
      <Backdrop open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default Loading;
