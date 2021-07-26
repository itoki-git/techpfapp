import styles from "../../styles/Button.module.scss";

const Button = (props) => {
  return <a className={styles.button}>{props.displayName}</a>;
};
export default Button;
