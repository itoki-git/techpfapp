import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import styles from "../styles/ArticlePage.module.scss";
import { RecoilRoot, useRecoilState } from "recoil";
import Grid from "@material-ui/core/Grid";

import { menuListState, menuState } from "./api/createStore";
import { component } from "./api/createComponent";
import { SideButton } from "./api/createComponent";

const CreatePage = () => {
  return (
    <Layout title="create">
      <Header />
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

  return (
    <div className={styles.createPage}>
      <Sidebar />
      <div className={styles.flexitem}>
        <div className={styles.boxholder}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {menuList.map((item) => (
              <Grid
                alignItems="center"
                container
                className={`${styles["item"]}`}
              >
                <Item value={item} />
                <SideButton deleteID={item.id} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};
