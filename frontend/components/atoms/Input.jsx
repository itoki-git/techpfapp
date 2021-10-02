import styles from "../../styles/atoms/Input.module.scss";
import { RecoilRoot, atomFamily, useRecoilState } from "recoil";
import { textStateFamily } from "../../pages/api/createStore";

// 入力ボックス
export const Input = (props) => {
  const [text, setText] = useRecoilState(textStateFamily(props.id));
  return (
    <input
      className={`${styles["input"]} ${styles[props.size]}
      ${styles[props.bold]} ${styles[props.component]}`}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
