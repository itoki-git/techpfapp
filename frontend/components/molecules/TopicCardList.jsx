import React, { forwardRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { codeItems, skilsItems } from '../../pages/api/icon';
import { TopicCard } from '../atoms/TopicCard';

export const TopicCardList = (props) => {
  const listItems = props.listItems;
  return (
    <Grid container spacing={2}>
      {listItems.map((item, i) => (
        <Grid item xs={4} sm={2} key={i}>
          <TopicCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
