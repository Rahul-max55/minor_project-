import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import { PATHS } from "./paths";

export const UserPrivateRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to={PATHS.login} />;
};

export const AdminPrivateRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to={PATHS.login} />;
};
