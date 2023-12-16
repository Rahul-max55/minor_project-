import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routeMap } from "./routeMap";
import { PrivateRoutes } from "./PrivateRoutes";
import { PATHS } from "./paths";
import Login_Signup from "../Login_Signup/Login_Signup";
import { ReverseRoutes } from "./ReverseRoutes";
import Forgatepass from "../Forgate_password/Forgatepass";
import { PageNotFound } from "../404/404";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* error page */}
        <Route path="/*" element={<PageNotFound />} />
        {/* <Route>
          <Route path="/forgatepass" element={<Forgatepass />} />
        </Route> */}

        {routeMap.map((val) => {
          return val.isProtected ? (
            <Route key={val.id} element={<PrivateRoutes />}>
              <Route path={val.path} element={<val.Element />} />
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
