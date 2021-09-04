import styles from "../../styles/molecules/Menu.module.scss";
import { useSetRecoilState, useRecoilState } from "recoil";

import { menuCountState, menuListState } from "../../pages/api/create";

const Menu = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);
  const addItem = (menuid) => {
    console.log(menu);
    setMenu(() =>
      menu.concat({ id: menu.length.toString(), component: menuid })
    );
  };

  return (
    <li className={styles.navname} key={props.id}>
      <a
        className={`${styles["link"]} ${styles["menu"]}`}
        href="#"
        onClick={() => addItem(props.id)}
      >
        {props.displayName}
      </a>
    </li>
  );
};
export default Menu;
