import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState } from 'recoil';
import { Input } from '../../components/atoms/Input';
import { menuListState } from './createStore';

import styles from '../../styles/Component.module.scss';

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
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
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
    case '0':
      return <div className={`${styles['title1']}`} onClick={console.log(id)}></div>;
    case '1':
      return <div className={`${styles['title2']}`}></div>;
    case '2':
      return <div className={`${styles['title2']}`}></div>;
    case '3':
      return (
        <Grid item xs={11} className={`${styles['title2']}`}>
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
          <Input id={id} placeholder="小見出し" size="large" bold="bold" />
        </Grid>
      );
    default:
      return <li key={id}>d</li>;
  }
};
