import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Input } from '../atoms/Input';
import { textStateFamily } from '../state/createStore';
import styles from '../../styles/organisms/Login.module.scss';
import { useRecoilValue } from 'recoil';
import { api, url } from '../../pages/api/utility';

const Signup = (props) => {
  const name = useRecoilValue(textStateFamily('signupName'));
  const email = useRecoilValue(textStateFamily('signupEmail'));
  const password = useRecoilValue(textStateFamily('signupPassword'));

  const signup = async (e) => {
    const data = { name: name, email: email, password: password };
    e.preventDefault();
    await axios.post(api.signup, data).then((res) => {
      console.log('signup');
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Signup</div>
      <form onSubmit={signup}>
        <div className={styles.field}>
          <label>Name</label>
          <Input stateId="signupName" id="signupName" component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <Input stateId="signupEmail" id="signupEmail" component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <Input stateId="signupPassword" id="signupPassword" component="auth" type="password" />
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
