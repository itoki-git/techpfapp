import axios from "axios";
import Link from "next/link";
import { Input } from "../atoms/Input";
import { textStateFamily } from "../../pages/api/createStore";

import styles from "../../styles/organisms/Login.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../state/currentUser";

const Login = (props) => {
  const email = useRecoilValue(textStateFamily("email"));
  const password = useRecoilValue(textStateFamily("password"));
  const [isLogin, setLoginState] = useRecoilState(loginState);

  const login = async (e) => {
    const data = { email: email, password: password };
    e.preventDefault();
    await axios
      .post("/api/login", data, {
        withCredentials: true,
      })
      .then((res) => console.log("LOGIN"), setLoginState(true))
      .catch((err) => setLoginState(false));
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
          Not a member? <Link href="/signup">Signup now</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
