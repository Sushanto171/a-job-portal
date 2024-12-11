import { Outlet } from "react-router-dom";
import Footer from "../pages/Common/Footer/Footer";
import Navbar from "../pages/Common/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
