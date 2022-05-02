import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Input } from '../atoms/Input';
import { stateName, textStateFamily } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import layoutStyle from '../../styles/Layout.module.scss';
import { api, url } from '../../pages/api/utility';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { CircularLoad } from '../atoms/Loading';
import { MessageSnackbar } from '../atoms/MessageBar';

const Signup = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const username = useRecoilValue(textStateFamily(stateName.signupUserName));
  const nickname = useRecoilValue(textStateFamily(stateName.signupNickName));
  const password = useRecoilValue(textStateFamily(stateName.signupPassword));
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '更新できませんでした',
    severity: 'error',
  });

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
  };

  const signup = async (e) => {
    e.preventDefault();
    if (nickname && username && password) {
      setIsLoading(true);
      const data = { nickname: nickname, username: username, password: password };
      await axios
        .post(api.signup, data)
        .then((res) => {
          setIsLoading(false);
          setIsFail(false);
          setBarState({ ...barState, open: true, message: 'ユーザーを登録しました', severity: 'success' });
          router.push(url.login);
        })
        .catch((err) => {
          setIsFail(true);
          setBarState({
            ...barState,
            open: true,
            message: '別のユーザーネームを入力してください',
            severity: 'error',
          });
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className={layoutStyle.load}>
          <CircularLoad message="checking..." />
        </div>
      ) : (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.title}>Signup</div>
            <form onSubmit={signup}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>ユーザーネーム</label>
                <Input stateId={stateName.signupUserName} id={stateName.signupUserName} component="auth" type="text" />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>ニックネーム</label>
                <Input stateId={stateName.signupNickName} id={stateName.signupNickName} component="auth" type="text" />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>パスワード</label>
                <Input
                  stateId={stateName.signupPassword}
                  id={stateName.signupPassword}
                  component="auth"
                  type="password"
                />
              </div>
              <div className={styles.field}>
                <input
                  className={styles.submit}
                  type="submit"
                  value="Signup"
                  disabled={!nickname || !username || !password}
                />
              </div>
              <div className={styles.signup}>
                a member? <Link href={url.login}>Login now</Link>
              </div>
            </form>
          </div>
          {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
        </div>
      )}
    </div>
  );
};
export default Signup;
