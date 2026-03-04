import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const UserLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);
export default UserLayout;