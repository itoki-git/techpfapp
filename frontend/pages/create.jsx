import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import styles from "../styles/ArticlePage.module.scss";
import { RecoilRoot, useRecoilState } from "recoil";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import axios from "axios";

import { menuListState, menuState } from "./api/createStore";
import { component } from "./api/createComponent";
import { SideButton } from "./api/createComponent";

const CreatePage = () => {
  const menus = [
    { displayName: "Logout", to: "/logout" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <Layout title="create">
      <Header menus={menus} />
      <RecoilRoot>
        <Create />
      </RecoilRoot>
    </Layout>
  );
};
export default CreatePage;

const Create = () => {
  const [menuList, setMenuLisr] = useRecoilState(menuListState);

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

    await axios.post("/api/registerArticle", data, {
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
                <div className={`${styles["item"]}`}>
                  <div className={`${styles["itemArea"]}`}>
                    <Item value={item} />
                  </div>

                  <div className={`${styles["sideArea"]}`}>
                    <SideButton itemID={item.id} swapID={i} />
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </form>
  );
};
