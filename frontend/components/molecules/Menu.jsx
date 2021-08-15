import { ListItem } from "@material-ui/core";
import styles from "../../styles/Menu.module.scss";

const Menu = (props) => {
  return (
    <ul className={styles.submenu}>
      {props.menuItem.map((item, i) => {
        <li className={styles.navname}>
          <a className={`${styles["link"]} ${styles["linkname"]}`} href="#">
            {item.displayName}
          </a>
        </li>;
      })}
    </ul>
  );
};
export default Menu;
