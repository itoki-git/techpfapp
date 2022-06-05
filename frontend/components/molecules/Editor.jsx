import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../styles/molecules/Editor.module.scss';
import { Textarea } from '../atoms/Textarea';
import { editorHeight } from '../state/createStore';

export const Editor = (props) => {
  // マークダウンエディターの高さを取得
  let editorArea = null;
  let previewHeight = null;
  const [height, setHeight] = useRecoilState(editorHeight);
  useEffect(() => {
    editorArea = document.getElementById(props.id);
    previewHeight = editorArea.scrollHeight;
    setHeight(previewHeight);
  }, editorArea);

  return (
    <div className={styles.editor}>
      <Textarea
        stateId={props.id}
        id={props.id}
        component="inputarea"
        placeholder="Markdownで記述しよう!"
        row={15}
        minHeight={height}
      />
    </div>
  );
};
