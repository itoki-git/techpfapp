import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from '../atoms/Input';
import { textStateFamily } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { loginState } from '../state/currentUser';
import { api, url } from '../../pages/api/utility';

const Login = (props) => {
  const [email, setEmail] = useRecoilState(textStateFamily('email'));
  const [password, setPswd] = useRecoilState(textStateFamily('password'));
  const setLoginState = useResetRecoilState(loginState);
  const router = useRouter();

  const login = async (e) => {
    const data = { email: email, password: password };
    e.preventDefault();
    await axios
      .post(api.login, data, {
        withCredentials: true,
      })
      .then((res) => console.log('LOGIN'), setLoginState(true), handler())
      .catch((err) => setLoginState(false));
  };
  const handler = () => {
    setLoginState(true);
    setEmail('');
    setPswd('');
    router.push(url.article);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Login</div>
      <form onSubmit={login}>
        <div className={styles.field}>
          <label>Email</label>
          <Input id="email" component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <Input id="password" component="auth" type="password" />
        </div>
        <div className={styles.field}>
          <input className={styles.submit} type="submit" value="Login" />
        </div>
        <div className={styles.signup}>
          Not a member? <Link href={url.signup}>Signup now</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
