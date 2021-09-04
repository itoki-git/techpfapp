import Link from "next/link";
import Button from "../atoms/Button";

import styles from "../../styles/molecules/Nav.module.scss";

// ナビメニュー
const Nav = (props) => {
  const { menus } = props;
  return (
    <nav className={`${styles[props.style]} ${styles[props.active]}`}>
      <ul className={styles.ul}>
        {menus.map((menu, i) => (
          <Link href={menu.to}>
            <li className={styles.navmenu} key={i}>
              <Button displayName={menu.displayName} style={props.button} />
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
