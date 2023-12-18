import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ReverseRoutes } from "./ReverseRoutes";
import { PageNotFound } from "../pages/404";
import { adminRouteMap} from "./routeMap";
import AdminHome from "../admin/Pages/AdminHome";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        {/* error page */}
        <Route path="/*" element={<PageNotFound />} />
        {/* <Route>
          <Route path="/forgatepass" element={<Forgatepass />} />
        </Route> */}

        {adminRouteMap.map((val) => {
          return val.isProtected ? (
            <Route key={val.id} element={<PrivateRoutes />}>
              <Route key={val.id} element={<AdminHome />}>
                <Route path={val.path} element={<val.Element />} />
              </Route>
            </Route>
          ) : (
            <Route key={val.id} element={<ReverseRoutes />}>
              <Route path={val.path} element={<val.Element />} />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};


export default AdminRoutes;
