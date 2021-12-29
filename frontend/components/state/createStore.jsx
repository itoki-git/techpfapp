import { atom, atomFamily } from 'recoil';

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
