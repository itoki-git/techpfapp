import { atom, atomFamily, selector } from 'recoil';

export const editState = atom({
  key: 'create/editState',
  default: null,
});

export const menuOpenState = atom({
  key: 'menuOpenState',
  default: false,
});

export const menuCountState = atom({
  key: 'menuCountState',
  default: 0,
});

export const menuListState = atom({
  key: 'menuListState',
  default: [],
});

export const textStateFamily = atomFamily({
  key: 'input/text',
  default: '',
});

export const backgroundFamily = atomFamily({
  key: 'create/background',
  default: '#fff',
});

export const colorFamily = atomFamily({
  key: 'create/color',
  default: '#000',
});
