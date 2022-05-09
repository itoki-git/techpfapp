import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input } from '../atoms/Input';
import { textStateFamily, stateName } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import layoutStyle from '../../styles/Layout.module.scss';
import { url } from '../../pages/api/utility';
import { useLogin, useUser, userState } from '../../pages/api/userAPI';
import { useRecoilValue, useRecoilState } from 'recoil';
import { CircularLoad } from '../atoms/Loading';
import { MessageSnackbar } from '../atoms/MessageBar';

const Login = () => {
  const username = useRecoilValue(textStateFamily(stateName.loginUserName));
  const password = useRecoilValue(textStateFamily(stateName.loginPassword));
  const [isLoading, setIsLoading] = useState(false);
  const { loggedOut, user } = useUser();
  const login = useLogin();
  const [isLoginState, setIsLogin] = useRecoilState(userState);
  const [barState, setBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'error',
    severity: 'error',
  });

  useEffect(() => {
    if ((user && !loggedOut) || isLoginState) {
      Router.replace(url.article);
    }
  }, [user, loggedOut]);

  const messageBarClose = () => {
    setBarState({ ...barState, open: false });
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let isLogin = false;
    if (username && password) {
      isLogin = await login();
      if (!isLogin) {
        setBarState({
          ...barState,
          open: true,
          message: 'ユーザーネームまたはパスワードが間違っています',
          severity: 'error',
        });
        setIsLoading(false);
      } else {
        setIsLogin(true);
      }
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
            <div className={styles.title}>Login</div>
            <form onSubmit={handleClickLogin}>
              <div className={styles.field}>
                <label>ユーザーネーム</label>
                <Input stateId={stateName.loginUserName} id={stateName.loginUserName} component="auth" type="text" />
              </div>
              <div className={styles.field}>
                <label>パスワード</label>
                <Input
                  stateId={stateName.loginPassword}
                  id={stateName.loginPassword}
                  component="auth"
                  type="password"
                />
              </div>
              <div className={styles.field}>
                <input className={styles.submit} type="submit" value="Login" disabled={!username || !password} />
              </div>
              <div className={styles.signup}>
                Not a member? <Link href={url.signup}>Signup now</Link>
              </div>
            </form>
          </div>
          {barState.open ? <MessageSnackbar barState={barState} messageBarClose={messageBarClose} /> : ''}
        </div>
      )}
    </div>
  );
};
export default Login;
