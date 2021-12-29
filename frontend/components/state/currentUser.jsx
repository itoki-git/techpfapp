import { atom } from 'recoil';

export const loginState = atom({
  key: 'auth/loginState',
  default: false,
});

export const userState = atom({
  key: 'auth/menuCountState',
  default: { name: '' },
});
