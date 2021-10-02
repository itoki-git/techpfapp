import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";
import Login from "../components/organisms/Login";
import Container from "@mui/material/Container";
import { RecoilRoot, useRecoilState } from "recoil";

const LoginPage = () => {
  const menus = [
    { displayName: "Login", to: "/login" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <Layout title="login">
      <Header menus={menus} />
      <RecoilRoot>
        <Container maxWidth="sm">
          <Login />
        </Container>
      </RecoilRoot>
    </Layout>
  );
};
export default LoginPage;
