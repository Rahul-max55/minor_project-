import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routeMap } from "./routeMap";
import { PrivateRoutes } from "./PrivateRoutes";
import { ReverseRoutes } from "./ReverseRoutes";
import { PageNotFound } from "../pages/404";

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
