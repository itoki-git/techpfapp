import styles from "../../styles/molecules/Menu.module.scss";
import { useSetRecoilState, useRecoilState } from "recoil";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";

import {
  menuCountState,
  menuListState,
  menuOpenState,
} from "../../pages/api/createStore";

const Menu = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);
  const [open, setOpen] = useRecoilState(menuOpenState);
  const addItem = (menuid) => {
    setMenu(() =>
      menu.concat({ id: menu.length.toString(), component: menuid })
    );
  };

  return (
    <li
      className={`${styles["navname"]} ${styles[open ? "open" : ""]}`}
      key={props.id}
    >
      <a
        className={`${styles["link"]}`}
        href="#"
        onClick={() => addItem(props.id)}
      >
        <div className={styles.linkItem}>
          <HorizontalSplitIcon className={styles.icon} fontSize="small" />
          <span className={`${styles["linkname"]}`}>{props.displayName}</span>
        </div>
      </a>
      <span className={styles.tooltip}>{props.displayName}</span>
    </li>
  );
};
export default Menu;
