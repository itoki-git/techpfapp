import React, { useReducer } from 'react';

var initialState = {
  name: '',
  email: '',
  shortProfile: '',
  profile: '',
  redirect: false,
  isLogin: false,
  article: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'GET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'CHANGE_REDIRECT':
      return {
        ...state,
        redirect: action.payload,
      };
    case 'LOGIN_STATUS':
      return {
        ...state,
        isLogin: action.payload,
      };

    default:
      return state;
  }
}

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
