import { atom, selector } from "recoil";

export const menuListState = atom({
  key: "menuListState",
  default: [],
});

export const component = (menu) => {
  switch (menu) {
    case 0:
      return <li key="1">a</li>;
    case 1:
      return <li key="2">b</li>;
    case 2:
      return <li key="3">c</li>;
    default:
      return <li key="4">d</li>;
  }
};
