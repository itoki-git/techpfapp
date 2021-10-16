import axios from "axios";
import { useSetRecoilState } from "recoil";
import Router from "next/router";
import { loginState } from "../state/currentUser";
import { api, url } from "../../pages/api/utility";
const Logout = (props) => {
  const setLoginState = useSetRecoilState(loginState);
  const logout = async (e) => {
    const response = await axios
      .post(api.logout, {
        withCredentials: true,
      })
      .then(setLoginState(false), Router.push(url.home));
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};
export default Logout;
