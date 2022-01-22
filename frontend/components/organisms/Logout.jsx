import React from 'react';
import axios from 'axios';
import { api, url } from '../../pages/api/utility';
import { AuthContext } from '../state/AuthStore';

const Logout = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const logout = async (e) => {
    e.preventDefault();
    await axios
      .post(api.logout, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: 'GET_NAME',
          payload: '',
        });
        dispatch({
          type: 'GET_EMAIL',
          payload: '',
        });
        dispatch({
          type: 'GET_SHORT_PROFILE',
          payload: '',
        });
        dispatch({
          type: 'GET_PROFILE',
          payload: '',
        });
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true,
        });
      });
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};
export default Logout;
