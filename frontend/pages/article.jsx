import CardList from "../components/organisms/CardList";
import Layout from "../components/templates/Layout";
import { RecoilRoot } from "recoil";
import PrivateLayout from "../components/templates/PrivateLayout";

const ArticlePage = () => {
  return (
    <Layout title="article">
      <CardList />
    </Layout>
  );
};
export default ArticlePage;
