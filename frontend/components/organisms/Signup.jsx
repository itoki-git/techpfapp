import axios from "axios";
import Link from "next/link";
import { Input } from "../atoms/Input";
import { textStateFamily } from "../../pages/api/createStore";

import styles from "../../styles/organisms/Login.module.scss";
import { useRecoilValue } from "recoil";

const Signup = (props) => {
  const name = useRecoilValue(textStateFamily("name"));
  const email = useRecoilValue(textStateFamily("email"));
  const password = useRecoilValue(textStateFamily("password"));

  const signup = async (e) => {
    const data = { name: name, email: email, password: password };
    e.preventDefault();
    await axios.post("/api/signup", data).then((res) => {
      console.log("signup");
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Signup</div>
      <form onSubmit={signup}>
        <div className={styles.field}>
          <label>Name</label>
          <Input id="name" component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <Input id="email" component="auth" type="text" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <Input id="password" component="auth" type="password" />
        </div>
        <div className={styles.field}>
          <input className={styles.submit} type="submit" value="Sign UP" />
        </div>
        <div className={styles.signup}>
          a member? <Link href="/login">Login now</Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;
