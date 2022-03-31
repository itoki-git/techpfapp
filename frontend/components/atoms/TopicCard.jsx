import React from 'react';
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
      <div className={styles.topicIcon}>
        <div className={styles.topicIconImage}>{item.icon}</div>
      </div>

      <div className={styles.topicName}>{item.iconName}</div>
    </>
  );
};
