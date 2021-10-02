import CardList from "../components/organisms/CardList";
import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";

const ArticlePage = () => {
  const menus = [
    { displayName: "Login", to: "/login" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <Layout title="article">
      <Header menus={menus} />
      <CardList />
    </Layout>
  );
};
export default ArticlePage;
