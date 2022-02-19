import React from 'react';
import Grid from '@mui/material/Grid';
import { SelectTopicCard, TopicCard } from '../atoms/TopicCard';
import styles from '../../styles/atoms/TopicCard.module.scss';

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

export const TopicSelectdList = (props) => {
  const { listItems, selectList } = props;
  const arrayExists = (id) => {
    const isMatch = selectList.find((listItem) => listItem.id === id);
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Grid container spacing={2}>
      {listItems.map((item, i) => (
        <Grid item xs={4} sm={2} key={i}>
          <input
            type="checkbox"
            id={item.id}
            style={{ display: 'none' }}
            onChange={() => props.handleSelectTopic(item)}
            checked={arrayExists(item.id)}
          />
          <label htmlFor={item.id} className={`${styles['topic']} ${arrayExists(item.id) ? styles['selected'] : null}`}>
            <SelectTopicCard item={item} />
          </label>
        </Grid>
      ))}
    </Grid>
  );
};
