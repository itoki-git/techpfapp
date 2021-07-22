import Nav from "../molecules/Nav";
import Layout from "./Layout";

const Header = (props) => {
  const menus = [
    { displayName: "Logout", to: "/logout" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <Layout>
      <Nav menus={menus} />
    </Layout>
  );
};
export default Header;
