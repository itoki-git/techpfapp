import axios from "axios";
import { Input } from "../atoms/Input";
import { textStateFamily } from "../../pages/api/createStore";

import styles from "../../styles/organisms/Login.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";

const Login = (props) => {
  const email = useRecoilValue(textStateFamily("email"));
  const password = useRecoilValue(textStateFamily("password"));

  const signup = async (e) => {
    const data = { name: "itoki", email: "email1", password: "admin" };
    e.preventDefault();
    await axios.post("/api/signup", data);
  };
  const login = async (e) => {
    const data = { email: email, password: password };
    console.log(data);
    e.preventDefault();
    await axios.post("/api/login", data, {
      withCredentials: true,
    });
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
          Not a member? <a href="#">Signup now</a>
        </div>
      </form>
    </div>
  );
};
export default Login;
