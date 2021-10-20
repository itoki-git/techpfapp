import Logout from '../components/organisms/Logout';
import PrivateLayout from '../components/templates/PrivateLayout';
import { RecoilRoot } from 'recoil';

const LogoutPage = () => {
  return (
    <PrivateLayout title="logout">
      <Logout />
    </PrivateLayout>
  );
};
export default LogoutPage;
