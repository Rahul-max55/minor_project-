import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";
import Cookies from "js-cookie";

export const ReverseRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Navigate to={PATHS.root} /> : <Outlet />;
};
