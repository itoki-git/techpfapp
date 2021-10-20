import Sidebar from './Sidebar';
import styles from '../../styles/ArticlePage.module.scss';
import { useRecoilValue } from 'recoil';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { loginState } from '../state/currentUser';

import { menuListState } from '../state/createStore';
import { component, SideButton } from '../state/createComponent';
import { api } from '../../pages/api/utility';
import ToolBar from '../molecules/ToolBar';
import { Button, Divider, Drawer } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';

const Create = () => {
  const menuList = useRecoilValue(menuListState);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      aaa
    </Box>
  );

  const Item = ({ value }) => {
    //console.log(value);
    return component(value);
  };

  // 記事登録
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: 'sample',
      article: menuList,
    };

    await axios.post(api.register_article, data, {
      withCredentials: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">公開</button>
      <ToolBar />
      <div className={styles.createPage}>
        <div>
          <Sidebar />
        </div>
        <div className={styles.flexitem}>
          <div className={styles.boxholder}>
            {menuList.map((item, i) => (
              <li className={`${styles['item']}`} key={i}>
                <Button onClick={toggleDrawer('right', true)}>
                  <Item value={item} />
                </Button>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                  {list('right')}
                </Drawer>
              </li>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
export default Create;
