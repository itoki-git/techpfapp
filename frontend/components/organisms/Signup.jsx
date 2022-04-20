import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Input } from '../atoms/Input';
import { stateName, textStateFamily } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import { api, url } from '../../pages/api/utility';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

const Signup = (props) => {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const username = useRecoilValue(textStateFamily(stateName.signupUserName));
  const nickname = useRecoilValue(textStateFamily(stateName.signupNickName));
  const password = useRecoilValue(textStateFamily(stateName.signupPassword));
  useEffect(() => {
    if (isReady) {
      setLoading(true);
    }
  }, [isReady]);

  const signup = async (e) => {
    e.preventDefault();
    if (nickname === '' || username === '' || password === '') {
      console.log('error');
      return;
    }
    const data = { nickname: nickname, username: username, password: password };
    await axios
      .post(api.signup, data)
      .then((res) => {
        router.push(url.login);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Signup</div>
      <form onSubmit={signup}>
        <div className={styles.field}>
          <label>ニックネーム</label>
          <Input stateId={stateName.signupNickName} id={stateName.signupNickName} component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>ユーザーネーム</label>
          <Input stateId={stateName.signupUserName} id={stateName.signupUserName} component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <Input stateId={stateName.signupPassword} id={stateName.signupPassword} component="auth" type="password" />
        </div>
        <div className={styles.field}>
          <input className={styles.submit} type="submit" value="Sign UP" />
        </div>
        <div className={styles.signup}>
          a member? <Link href={url.login}>Login now</Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;
