import React from 'react';
import styles from '../../styles/molecules/Menu.module.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Image from 'next/image';

import { editID, menuListState, menuState } from '../state/createStore';

const Menu = (props) => {
  const [menuList, setMenuList] = useRecoilState(menuListState);
  const [id, setID] = useRecoilState(editID);

  const addItem = (menuid) => {
    setMenuList(() => [
      ...menuList,
      {
        id: id,
        component: menuid,
        background: '#ffffff',
        color: '#000000',
        format: [],
      },
    ]);
    setID(id + 1);
  };
  return (
    <div className={styles.subMenu}>
      <div className={styles.content}>
        <ul>
          {props.menuContent.map((item) => (
            <li className={styles.item} key={item.id}>
              <a onClick={() => addItem(item.id)}>
                <Image className={styles.image} src={item.image} alt={item.id} width={400} height={200} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Menu;
