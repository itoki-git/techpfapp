import Link from "next/link";
import Button from "../atoms/Button";

import styles from "../../styles/Nav.module.scss";

// ナビメニュー
const Nav = (props) => {
  const { menus } = props;
  console.log(menus);
  return (
    <ul className={styles.nav}>
      {menus.map((menu, i) => (
        <Link href={menu.to}>
          <li className={styles.navmenu} key={i}>
            <Button displayName={menu.displayName} />
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default Nav;
