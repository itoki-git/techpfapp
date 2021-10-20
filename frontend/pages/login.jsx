import Layout from '../components/templates/Layout';
import Header from '../components/organisms/Header';
import Login from '../components/organisms/Login';
import Container from '@mui/material/Container';
import { RecoilRoot, useRecoilState } from 'recoil';

const LoginPage = () => {
  return (
    <Layout title="login">
      <Container maxWidth="sm">
        <Login />
      </Container>
    </Layout>
  );
};
export default LoginPage;
