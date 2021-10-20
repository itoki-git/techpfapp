import styles from '../../styles/molecules/Menu.module.scss';
import { useSetRecoilState, useRecoilState } from 'recoil';
import Image from 'next/image';

import { menuListState, menuOpenState } from '../state/createStore';

const Menu = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);
  const [selected, setSelected] = useRecoilState(menuOpenState);
  const addItem = (menuid) => {
    setMenu(() => menu.concat({ id: menu.length.toString(), component: menuid }));
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
