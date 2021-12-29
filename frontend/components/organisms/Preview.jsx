import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import styles from '../../styles/organisms/Preview.module.scss';
import 'zenn-content-css';

export const Preview = (props) => {
  // マークダウンエディターの高さを取得
  let editorArea = document.getElementById('editEl');
  let previewHeight = editorArea.scrollHeight;
  return (
    <div className={styles.preview} style={{ height: previewHeight }}>
      <ReactMarkdown className="znc" plugins={[gfm]} unwrapDisallowed={false}>
        {props.markdown}
      </ReactMarkdown>
    </div>
  );
};
