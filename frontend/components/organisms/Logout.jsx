import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "../state/currentUser";
const Logout = (props) => {
  const setLoginState = useSetRecoilState(loginState);
  const logout = async (e) => {
    const response = await axios
      .post("/api/logout", {
        withCredentials: true,
      })
      .then(setLoginState(false));
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};
export default Logout;
