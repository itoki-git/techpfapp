import Layout from "../components/templates/Layout";
import Header from "../components/organisms/Header";
import Signup from "../components/organisms/Signup";
import Container from "@mui/material/Container";
import { RecoilRoot } from "recoil";

const LoginPage = () => {
  return (
    <Layout title="signup">
      <Container maxWidth="sm">
        <Signup />
      </Container>
    </Layout>
  );
};
export default LoginPage;
