import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import { Textarea } from "../../components/atoms/Textarea";
import { Input } from "../../components/atoms/Input";
import { menuListState, itemID } from "./createStore";

import styles from "../../styles/Component.module.scss";

export const SideButton = (props) => {
  const [menu, setMenu] = useRecoilState(menuListState);

  const deleteItem = () => {
    let result = menu.filter((item) => {
      return item.id !== props.itemID;
    });
    setMenu(result);
  };

  const replacingOnItem = () => {
    let swap = menu.slice();
    let index = Number(props.swapID);
    if (index > 0) {
      swap.splice(index - 1, 2, swap[index], swap[index - 1]);
      setMenu(swap);
    }
  };

  const replacingUnderItem = () => {
    let swap = menu.slice();
    let index = Number(props.swapID);
    if (index < menu.length - 1) {
      swap.splice(index, 2, swap[index + 1], swap[index]);
      setMenu(swap);
    }
  };

  return (
    <Grid item xs={1}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <Tooltip title="削除" placement="right-end">
          <IconButton onClick={() => deleteItem()}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="上に移動" placement="right-end">
          <IconButton onClick={() => replacingOnItem()}>
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="下に移動" placement="right-end">
          <IconButton onClick={() => replacingUnderItem()}>
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
