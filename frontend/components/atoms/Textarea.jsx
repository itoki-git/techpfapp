import styles from "../../styles/atoms/Textarea.module.scss";
import { RecoilRoot, atomFamily, useRecoilState } from "recoil";
import { textStateFamily } from "../../pages/api/create";

// テキストエリア
export const Textarea = (props) => {
  const [text, setText] = useRecoilState(textStateFamily(props.id));
  const calcTextAreaHeight = () => {
    let rowsNum = text.split("\n").length;
    if (props.row > rowsNum) {
      return props.row;
    } else {
      return rowsNum;
    }
  };
  return (
    <textarea
      className={`${styles["textarea"]} ${styles[props.component]}`}
      defaultValue={text}
      placeholder={props.placeholder}
      rows={calcTextAreaHeight()}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
