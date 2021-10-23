import React, { useState } from 'react';
import styles from '../../styles/organisms/Sidebar.module.scss';
import Menu from '../molecules/Menu';
import { menuOpenState } from '../state/createStore';
import { useRecoilState } from 'recoil';

const Sidebar = (props) => {
  const [selected, setSelected] = useRecoilState(menuOpenState);
  const [page, setPage] = useState('');
  const menus = [
    { page: '1', displayName: 'タイトル' },
    { page: '2', displayName: '本文' },
    { page: '3', displayName: '小見出し' },
    { page: '4', displayName: 'カード' },
  ];
  const subMenu = [
    { id: '0', page: '1', image: '/header_1_sm.jpeg' },
    { id: '1', page: '1', image: '/header_1_sm.jpeg' },
    { id: '2', page: '2', image: '/content_1_sm.jpeg' },
  ];
  const match = subMenu.filter((value) => value.page === page);

  return (
    <div className={`${styles['sidebar']}`}>
      <div className={styles.menu} onMouseEnter={() => setSelected(false)} onMouseLeave={() => setSelected(true)}>
        <ul className={styles.menuList}>
          {menus.map((item, num) => (
            <li className={`${styles['menuItem']}`} onMouseEnter={() => setPage(item.page)} key={num}>
              <a className={styles.menuName}>{item.displayName}</a>
            </li>
          ))}
        </ul>
        <div className={`${styles['subMenu']} ${styles[selected ? 'hidden' : 'selected']}`}>
          <Menu menuContent={match} />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
