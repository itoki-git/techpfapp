import React from 'react';

import Grid from '@mui/material/Grid';
import Link from 'next/link';

import styles from '../../styles/atoms/TopicCard.module.scss';
import { TopicCard } from '../atoms/TopicCard';

export const TopicCardList = (props) => {
  const listItems = props.listItems;
  return (
    <Grid container spacing={2}>
      {listItems.map((item, i) => (
        <Grid item xs={4} sm={2} key={i}>
          <label className={styles.topicCard}>
            <TopicCard item={item} />
          </label>
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
          <button
            type="checkbox"
            id={item.id}
            style={{ display: 'none' }}
            onClick={() => props.handleSelectTopic(item)}
            checked={arrayExists(item.id)}
          />
          <label htmlFor={item.id} className={`${styles['topic']} ${arrayExists(item.id) ? styles['selected'] : null}`}>
            <TopicCard item={item} />
          </label>
        </Grid>
      ))}
    </Grid>
  );
};

export const TopicListButton = (props) => {
  const { listItems } = props;
  return (
    <Grid container spacing={2}>
      {listItems.map((item, i) => (
        <Grid item xs={4} sm={2} key={i}>
          <Link href="/topics/[item.iconName]" as={`/topics/${item.iconName}`}>
            <label htmlFor={item.id} className={styles.topic}>
              <TopicCard item={item} />
            </label>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
