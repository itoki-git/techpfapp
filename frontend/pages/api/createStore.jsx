import { atom, atomFamily, selector } from "recoil";

export const menuOpenState = atom({
  key: "menuOpenState",
  default: false,
});

export const menuCountState = atom({
  key: "menuCountState",
  default: 0,
});

export const menuListState = atom({
  key: "menuListState",
  default: [],
});

export const textStateFamily = atomFamily({
  key: "input/text",
  default: "",
});
