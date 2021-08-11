import GridOnIcon from "@material-ui/icons/GridOn";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "../../styles/Sidebar.module.scss";
import { style } from "@material-ui/system";

const Sidebar = (props) => {
  const menus = [
    { displayName: "Grid" },
    { displayName: "Image Gallery" },
    { displayName: "Split" },
    { displayName: "Text" },
    { displayName: "Text on Image" },
  ];
  return (
    <div className={`${styles["sidebar"]} ${styles["close"]}`}>
      <ul className={styles.navlinks}>
        <li className={styles.navname}>
          <ul className={`${styles["submenu"]} ${styles["blank"]}`}>
            <li>
              <a className={styles.linkname} href="#">
                Category
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.navname}>
          <div className={styles.iconlink}>
            <a className={styles.link} href="#">
              <i className={styles.iconname}>C</i>
              <span className={styles.linkname}>Category</span>
            </a>
            <ExpandMoreIcon className={styles.arrow} />
          </div>
          <ul className={styles.submenu}>
            <li className={styles.navname}>
              <a className={`${styles["link"]} ${styles["linkname"]}`} href="#">
                Category
              </a>
            </li>
            <li className={styles.navname}>
              <a className={`${styles["link"]} ${styles["menu"]}`} href="#">
                HTML & CSS
              </a>
            </li>
            <li className={styles.navname}>
              <a className={`${styles["link"]} ${styles["menu"]}`} href="#">
                JavaScript
              </a>
            </li>
            <li className={styles.navname}>
              <a className={`${styles["link"]} ${styles["menu"]}`} href="#">
                PHP & MySQL
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
