import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Common/Footer/Footer";
import Navbar from "../pages/Common/Navbar/Navbar";
import { AuthContext } from "../Provider/AuthContext/AuthContext";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  // if (loading) {
  //   return <span className="loading loading-spinner loading-xs"></span>;
  // }
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
