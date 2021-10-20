import { atom, atomFamily, selector } from 'recoil';

export const loginState = atom({
  key: 'auth/loginState',
  default: false,
});

export const userState = atom({
  key: 'menuCountState',
  default: { name: '' },
});
