import { atom } from 'recoil';

export const userState = atom({
  key: 'auth/user',
  default: undefined,
});
