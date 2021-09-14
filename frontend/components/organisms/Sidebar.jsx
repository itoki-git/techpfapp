import GridOnIcon from "@material-ui/icons/GridOn";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "../../styles/organisms/Sidebar.module.scss";
import Menu from "../molecules/Menu";
import { menuOpenState } from "../../pages/api/createStore";
import { useSetRecoilState, useRecoilState } from "recoil";

const Sidebar = (props) => {
  const [open, setOpen] = useRecoilState(menuOpenState);
  const menus = [
    { displayName: "タイトル" },
    { displayName: "本文" },
    { displayName: "小見出し" },
    { displayName: "カード" },
  ];

  return (
    <div className={`${styles["sidebar"]} ${styles[open ? "open" : ""]}`}>
      <div
        className={`${styles["logo"]} ${styles["btn"]}`}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.logoName}>Component</div>
        <NotesIcon className={`${styles["icon"]} ${styles["btn"]}`} />
      </div>
      <ul className={styles.navlist}>
        {menus.map((item, num) => (
          <Menu displayName={item.displayName} id={num.toString()} />
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
