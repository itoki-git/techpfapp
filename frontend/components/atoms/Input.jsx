import styles from "../../styles/atoms/Input.module.scss";

// 入力ボックス
const Input = (props) => {
  return (
    <div>
      <input
        className={styles.input}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};
