import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useRecoilValue } from 'recoil';
import gfm from 'remark-gfm';

import 'zenn-content-css';

import styles from '../../styles/organisms/Preview.module.scss';
import { editorHeight } from '../state/createStore';

export const Preview = (props) => {
  const height = useRecoilValue(editorHeight);
  return (
    <div className={styles.preview} style={{ minHeight: height }}>
      <ReactMarkdown className="znc" plugins={[gfm]} unwrapDisallowed={false}>
        {props.markdown}
      </ReactMarkdown>
    </div>
  );
};
