import Customizer from "./ThemeCustomizer";
import FooterLayout from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar-Layout/SideBar";
import { ToastContainer } from "react-toastify";
import Loader from "./Loader";
import Taptop from "./Taptop";
import { useSelector } from "react-redux";
import { ThemeCustomizerTypes } from "./ThemeCustomizer/ThemeCustomizerTypes";

const Layout = () => {
  const { sidebar_types } = useSelector((state: ThemeCustomizerTypes) => state.ThemeCustomizer);
  return (
    <>
      <Loader />
      <Taptop />
      <div className={`page-wrapper ${sidebar_types}`}>
        <Header />
        <div className={`page-body-wrapper ${sidebar_types === "compact-wrapper"? "sidebar-icon": "horizontal-menu"}`}>
          <SideBar />
          <div>
            <Outlet />
          </div>
          <Customizer />
          <FooterLayout />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
