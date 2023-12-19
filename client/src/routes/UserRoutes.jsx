import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReverseRoutes } from "./ReverseRoutes";
import { PageNotFound } from "../pages/404";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { userRouteMap } from "./routeMap";
import { UserPrivateRoutes } from './PrivateRoutes';

const UserRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* error page */}
        <Route path="/*" element={<PageNotFound />} />
        {/* <Route>
          <Route path="/forgatepass" element={<Forgatepass />} />
        </Route> */}

        {userRouteMap.map((val) => {
          return val.isProtected ? (
            <Route key={val.id} element={<UserPrivateRoutes />}>
              <Route path={val.path} element={<val.Element />} />
            </Route>
          ) : (
            <Route key={val.id} element={<ReverseRoutes />}>
              <Route path={val.path} element={<val.Element />} />
            </Route>
          );
        })}
      </Routes>
      <Footer />
    </>
  );
};


export default UserRoutes;