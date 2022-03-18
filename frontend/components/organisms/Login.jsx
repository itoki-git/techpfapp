import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input } from '../atoms/Input';
import { textStateFamily, stateName } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import { url } from '../../pages/api/utility';
import useUser, { useLogin } from '../../pages/api/userAPI';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/currentUser';

const Login = (props) => {
  const username = useRecoilValue(textStateFamily(stateName.loginUserName));
  const password = useRecoilValue(textStateFamily(stateName.loginPassword));
  const { mutate, loggedOut, user } = useUser();
  const login = useLogin();

  useEffect(() => {
    if (user && !loggedOut) {
      Router.replace(url.article);
    }
  }, [user, loggedOut]);

  const handleClickLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      login();
      mutate();
    }
  };

  return (
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
            <Input stateId={stateName.loginPassword} id={stateName.loginPassword} component="auth" type="password" />
          </div>
          <div className={styles.field}>
            <input className={styles.submit} type="submit" value="Login" />
          </div>
          <div className={styles.signup}>
            Not a member? <Link href={url.signup}>Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
