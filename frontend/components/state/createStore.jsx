import { atom, atomFamily } from 'recoil';

export const stateName = {
  signupName: 'signupName',
  signupEmail: 'signupEmail',
  signupPassword: 'signupPassword',
  create: 'create',
  loginEmail: 'loginEmail',
  loginPassword: 'loginPassword',
};

export const editState = atom({
  key: 'create/editState',
  default: true,
});

export const editID = atom({
  key: 'edit/id',
  default: 0,
});

export const textStateFamily = atomFamily({
  key: 'input/text',
  default: '',
});

export const editorHeight = atom({
  key: 'edit/height',
  default: null,
});

export const menuState = atom({
  key: 'menu/menuState',
  default: 0,
});
