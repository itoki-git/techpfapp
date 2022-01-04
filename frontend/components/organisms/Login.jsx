import React, { useState, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from '../atoms/Input';
import { textStateFamily } from '../state/createStore';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import styles from '../../styles/organisms/Login.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { api, url } from '../../pages/api/utility';
import { AuthContext } from '../state/AuthStore';

const Login = (props) => {
  const [email, setEmail] = useRecoilState(textStateFamily('loginEmail'));
  const [password, setPswd] = useRecoilState(textStateFamily('loginPassword'));
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  // Loginに成功or失敗したときにメッセージを表示する
  const AlertBar = (props) => {
    return (
      <Alert variant="filled" elevation="filled" {...props}>
        This is a success alert — check it out!
      </Alert>
    );
  };
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertOpen(false);
  };

  const login = async (e) => {
    const data = { email: email, password: password };
    e.preventDefault();
    await axios
      .post(api.login, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: 'GET_NAME',
          payload: res.data.name,
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: res.data.email,
        });
        dispatch({
          type: 'GET_SHORT_PROFILE',
          payload: res.data.shortProfile,
        });
        dispatch({
          type: 'GET_PROFILE',
          payload: res.data.profile,
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
        setMessageType('error');
        setMessage('Login failed.');
        setIsAlertOpen(true);
      });
  };

  if (state.isLogin) {
    router.push(url.article);
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.title}>Login</div>
        <form onSubmit={login}>
          <div className={styles.field}>
            <label>Email</label>
            <Input stateId="loginEmail" id="loginEmail" component="auth" type="text" />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <Input stateId="loginPassword" id="loginPassword" component="auth" type="password" />
          </div>
          <div className={styles.field}>
            <input className={styles.submit} type="submit" value="Login" />
          </div>
          <div className={styles.signup}>
            Not a member? <Link href={url.signup}>Signup now</Link>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert variant="filled" severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Login;
