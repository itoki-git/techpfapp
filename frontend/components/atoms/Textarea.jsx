import React from 'react';
import styles from '../../styles/atoms/Textarea.module.scss';
import { useRecoilState } from 'recoil';
import { textStateFamily } from '../state/createStore';

// テキストエリア
export const Textarea = (props) => {
  const [text, setText] = useRecoilState(textStateFamily(props.id));
  const calcTextAreaHeight = () => {
    let rowsNum = text.split('\n').length;
    if (props.row > rowsNum) {
      return props.row;
    } else {
      return rowsNum;
    }
  };
  return (
    <textarea
      className={`${styles['textarea']} ${styles[props.component]}`}
      defaultValue={text}
      id={props.id}
      placeholder={props.placeholder}
      rows={calcTextAreaHeight()}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
