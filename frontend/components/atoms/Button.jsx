import React from 'react';
import styles from '../../styles/atoms/Button.module.scss';

const Button = (props) => {
  return <a className={`${styles.button} ${styles[props.style]}`}>{props.displayName}</a>;
};
export default Button;
