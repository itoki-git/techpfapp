import { atom, atomFamily, selector } from "recoil";

export const menuCountState = atom({
  key: "menuCountState",
  default: 0,
});

export const menuListState = atom({
  key: "menuListState",
  default: [],
});

export const deleteMenuID = atom({
  key: "deleteMenuID",
  default: 0,
});

export const textStateFamily = atomFamily({
  key: "input/text",
  default: "",
});
