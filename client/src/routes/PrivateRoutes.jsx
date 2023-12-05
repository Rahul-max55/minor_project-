import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { PATHS } from "./paths";
import Cookies from "js-cookie";

export const PrivateRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="/login_signup" />;
};
