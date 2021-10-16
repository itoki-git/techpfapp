import Sidebar from "./Sidebar";
import styles from "../../styles/ArticlePage.module.scss";
import { useRecoilValue } from "recoil";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { loginState } from "../state/currentUser";

import { menuListState } from "../state/createStore";
import { component, SideButton } from "../state/createComponent";
import { api } from "../../pages/api/utility";

const Create = () => {
  const menuList = useRecoilValue(menuListState);
  const isLogin = useRecoilValue(loginState);

  const Item = ({ value }) => {
    return component(value);
  };

  // 記事登録
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: "sample",
      article: menuList,
    };

    await axios.post(api.register_article, data, {
      withCredentials: true,
    });

    console.log(menuList);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">公開</button>
      <div className={styles.createPage}>
        <div>
          <Sidebar />
        </div>
        <div className={styles.flexitem}>
          <div className={styles.boxholder}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {menuList.map((item, i) => (
                <li className={`${styles["item"]}`} key={i}>
                  <div className={`${styles["itemArea"]}`}>
                    <Item value={item} />
                  </div>

                  <div className={`${styles["sideArea"]}`}>
                    <SideButton itemID={item.id} swapID={i} />
                  </div>
                </li>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Create;
