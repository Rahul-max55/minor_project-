import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { PATHS } from "./paths";

export const PrivateRoutes = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login_signup" />;
};
