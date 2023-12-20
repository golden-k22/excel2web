import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes";
import PrivateRoute from "./PrivateRoute";
import Logins from "../Auth";

const Routers = () => {
  const login = localStorage.getItem("login");

  function getCookie(cname: any) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {login ? (
          <>

            {getCookie("token") ? (
              <>
                <Route path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/admin_panel`} />} />
                <Route
                  path={`/`}
                  element={
                    <Navigate to={`${process.env.PUBLIC_URL}/admin_panel`} />
                  }
                />
              </>) : (

              <>
                <Route path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/home`} />} />
                <Route
                  path={`/`}
                  element={
                    <Navigate to={`${process.env.PUBLIC_URL}/home`} />
                  }
                />
              </>)}

          </>
        ) : (
          ""
        )}
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Logins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
