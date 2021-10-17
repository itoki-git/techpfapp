import Link from "next/link";
import styles from "../../styles/molecules/Nav.module.scss";

// ナビメニュー
const Nav = (props) => {
  const { menus } = props;
  return (
    <nav className={`${styles[props.style]} ${styles[props.active]}`}>
      <ul className={styles.ul}>
        {menus.map((menu) => (
          <li className={styles.navmenu} key={menu.id}>
            <Link href={menu.to}>
              <a className={`${styles[props.button]} ${styles["link"]}`}>
                {menu.displayName}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
