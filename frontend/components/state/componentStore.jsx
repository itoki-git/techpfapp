import { selector } from 'recoil';
import { url } from '../../pages/api/utility';
import { loginState } from './currentUser';

const privateMenu = [
  { id: '1', displayName: 'Logout', to: url.logout },
  { id: '2', displayName: 'Article', to: url.article },
  { id: '3', displayName: 'Create', to: url.create },
  { id: '4', displayName: 'Page', to: url.demo },
];
const publicMenu = [
  { id: '1', displayName: 'Login', to: url.login },
  { id: '2', displayName: 'Article', to: url.article },
];

export const headerMenuState = selector({
  key: 'headerMenuState',
  get: ({ get }) => {
    const val = get(loginState);
    if (val) {
      return privateMenu;
    } else {
      return publicMenu;
    }
  },
});
