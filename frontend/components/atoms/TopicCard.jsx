import React from 'react';

import Skeleton from '@mui/material/Skeleton';

import styles from '../../styles/atoms/TopicCard.module.scss';

export const TopicCard = (props) => {
  const { item } = props;
  return (
    <>
      <div className={styles.topicIcon}>{item.icon}</div>
      <div className={styles.topicName}>{item.iconName}</div>
    </>
  );
};

export const TopicTitle = (props) => {
  const { item } = props;
  return (
    <>
      {item ? (
        <>
          <div className={styles.topicIcon}>
            <div className={styles.topicIconImage}>{item.icon}</div>
          </div>

          <div className={styles.topicName}>{item.iconName}</div>
        </>
      ) : (
        <>
          <div className={styles.topicIcon}>
            <div className={styles.topicIconImage}>
              <Skeleton variant="circular" width={100} height={100} />
            </div>

            <Skeleton className={styles.topicName} variant="text" />
          </div>
        </>
      )}
    </>
  );
};
