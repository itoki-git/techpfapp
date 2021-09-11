import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { Textarea } from "../../components/atoms/Textarea";
import { Input } from "../../components/atoms/Input";
import { menuListState } from "./createStore";

import styles from "../../styles/Component.module.scss";

export const SideButton = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);
  const deleteItem = () => {
    let result = menu.filter((item) => {
      return item.id !== props.deleteID;
    });
    setMenu(result);
  };

  return (
    <Grid item xs={1}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <IconButton onClick={() => deleteItem()}>
          <ClearIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const component = (menu) => {
  const id = menu.id;
  const component = menu.component;
  switch (component) {
    case "0":
      return (
        <Grid item xs={11} className={`${styles["title1"]}`}>
          <Textarea id={id} row={2} placeholder="タイトル" component="title1" />
        </Grid>
      );
    case "1":
      return (
        <Grid item xs={11} className={`${styles["title2"]}`}>
          <Textarea id={id} row={4} placeholder="本文" component="textBody" />
        </Grid>
      );
    case "2":
      return (
        <Grid item xs={11} className={`${styles["title2"]}`}>
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
        </Grid>
      );
    case "3":
      return (
        <Grid item xs={11} className={`${styles["title2"]}`}>
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
        </Grid>
      );
    default:
      return <li key={id}>d</li>;
  }
};
