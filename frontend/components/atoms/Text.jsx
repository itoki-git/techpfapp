import styles from "../../styles/atoms/Text.module.scss";

// テキスト
const Text = (props) => {
  return (
    <p className={styles.text}>
      {props.content}
      <style jsx>
        {`
          .text {
            overflow-wrap: break-word;
            word-wrap: break-word;
          }
        `}
      </style>
    </p>
  );
};
export default Text;
