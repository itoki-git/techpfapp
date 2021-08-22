import GridOnIcon from "@material-ui/icons/GridOn";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "../../styles/Sidebar.module.scss";
import { style } from "@material-ui/system";
import Menu from "../molecules/Menu";

const Sidebar = (props) => {
  const menus = [
    { displayName: "HTML & CSS" },
    { displayName: "JavaScript" },
    { displayName: "PHP & MySQL" },
    { displayName: "Golang" },
  ];
  return (
    <div className={`${styles["sidebar"]} ${styles["close"]}`}>
      <ul className={styles.navlinks}>
        <li className={styles.navname}>
          <div className={styles.iconlink}>
            <a className={styles.link} href="#">
              <NotesIcon className={styles.iconname} />
              <span className={styles.linkname}>Category</span>
            </a>
            <ExpandMoreIcon className={styles.arrow} />
          </div>
          <ul className={styles.submenu}>
            {menus.map((item, i) => (
              <Menu displayName={item.displayName} id={i} />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
