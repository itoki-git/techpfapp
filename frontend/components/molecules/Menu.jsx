import styles from "../../styles/Menu.module.scss";
import { useSetRecoilState, useRecoilState } from "recoil";

import { menuState, menuListState } from "../../pages/api/create";
import { useState } from "react";

const Menu = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);
  const [count, setCount] = useState(0);
  const addItem = (menuid) => {
    setMenu(() => menu.concat({ id: count, component: menuid }));
  };

  return (
    <li className={styles.navname} key={props.id}>
      <a
        className={`${styles["link"]} ${styles["menu"]}`}
        href="#"
        onClick={() => (addItem(props.id), setCount(count + 1))}
      >
        {props.displayName}
      </a>
    </li>
  );
};
export default Menu;
