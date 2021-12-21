import React from 'react';
import styles from '../../styles/molecules/Editor.module.scss';
import { Textarea } from '../atoms/Textarea';

export const Editor = (props) => {
  return (
    <div className={styles.editor}>
      <Textarea id={props.id} component="inputarea" placeholder="Markdownをで記述しよう!" row={15} />
    </div>
  );
};
