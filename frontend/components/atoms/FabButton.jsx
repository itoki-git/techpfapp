import React from 'react';

import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
export const FabButton = (props) => {
  return (
    <label htmlFor={props.id}>
      <Tooltip title={props.name} arrow>
        <Fab
          id={props.id}
          sx={props.sx}
          aria-label={props.label}
          component="span"
          color={props.color}
          onClick={() => props.action}
          style={{ cursor: 'pointer' }}
        >
          {props.children}
        </Fab>
      </Tooltip>
    </label>
  );
};
