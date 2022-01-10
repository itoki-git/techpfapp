import React from 'react';
import styles from '../../styles/atoms/Input.module.scss';
import { useRecoilState } from 'recoil';
import { textStateFamily } from '../state/createStore';

// 入力ボックス
export const Input = (props) => {
  const [text, setText] = useRecoilState(textStateFamily(props.stateId));
  return (
    <input
      className={`${styles['input']} ${styles[props.size]}
      ${styles[props.bold]} ${styles[props.component]}`}
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      defaultValue={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
