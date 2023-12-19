import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";

export const UserPrivateRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="/login_signup" />;
};

export const AdminPrivateRoutes = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="/login_signup" />;
};
