import React from 'react';
import styles from '../../styles/atoms/TopicCard.module.scss';

export const TopicCard = (props) => {
  const { item } = props;
  return (
    <div className={styles.topic}>
      <div className={styles.topicIcon}>{item.icon}</div>
      <div className={styles.topicName}>{item.iconName}</div>
    </div>
  );
};

export const SelectTopicCard = (props) => {
  const { item } = props;
  return (
    <>
      <div className={styles.topicIcon}>{item.icon}</div>
      <div className={styles.topicName}>{item.iconName}</div>
    </>
  );
};
