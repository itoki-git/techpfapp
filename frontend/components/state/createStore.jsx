import { atom, atomFamily } from 'recoil';

export const stateName = {
  signupName: 'signupName',
  signupEmail: 'signupEmail',
  signupPassword: 'signupPassword',
  create: 'create',
  loginEmail: 'loginEmail',
  loginPassword: 'loginPassword',
  editTopic: '_editTopic',
  selectedTopicsID: '_selectedTopics',
  topicSearchID: '_topicSearch',
  topicListID: '_topicList',
  createID: '_createID',
  markdown: '_markdown',
};

export const editState = atom({
  key: 'create/editState',
  default: true,
});

export const editID = atomFamily({
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

export const dialogState = atomFamily({
  key: 'dialog/isOpen',
  default: false,
});

export const topicListState = atomFamily({
  key: 'topics/list',
  default: [],
});

export const createIDState = atom({
  key: 'create/id',
  default: '',
});
