import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

export const LinearLoad = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
};

export const CircularLoad = (props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 40 }}>
        <CircularProgress />
      </Box>
      <Box sx={{ m: 2 }}>
        <h3>{props.message}</h3>
      </Box>
    </Box>
  );
};
