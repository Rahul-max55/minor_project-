import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routeMap } from "./routeMap";
import { PrivateRoutes } from "./PrivateRoutes";
import { PATHS } from "./paths";
import Login_Signup from "../Login_Signup/Login_Signup";
import { ReverseRoutes } from "./ReverseRoutes";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* default page redirection */}
        {/* <Route path={PATHS.root} element={<Navigate to={PATHS.login_signup} />} /> */}
        {/* error page */}
        {/* <Route path="/*" element={<ErrorPage />} /> */}
        <Route element={<ReverseRoutes />}>
          <Route path="/login_signup" element={<Login_Signup />} />
        </Route>

        {routeMap.map((val) => {
          return (
            <Route key={val.id} element={val.isProtected && <PrivateRoutes />}>
              <Route path={val.path} element={<val.Element />} />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};
