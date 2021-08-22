import styles from "../../styles/Menu.module.scss";

const Menu = (props) => {
  return (
    <li className={styles.navname} key={props.id}>
      <a className={`${styles["link"]} ${styles["menu"]}`} href="#">
        {props.displayName}
      </a>
    </li>
  );
};
export default Menu;
