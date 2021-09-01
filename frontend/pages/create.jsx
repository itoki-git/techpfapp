import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import styles from "../styles/ArticlePage.module.scss";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useRecoilSet,
} from "recoil";

import { component, menuListState, menuState } from "./api/create";
import { useEffect } from "react";

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

  const Item = (value) => {
    return component(value.value);
  };

  return (
    <div className={styles.createPage}>
      <Sidebar />
      <div className={styles.flexitem}>
        <div className={styles.boxholder}>
          <div className={styles.box}>
            <p className={styles.title}>New Block</p>
          </div>
        </div>
        <ul>
          {menuList.map((item) => (
            <Item value={item.component} />
          ))}
        </ul>
      </div>
    </div>
  );
};
