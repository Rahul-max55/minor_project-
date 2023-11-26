import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";

export const ReverseRoutes = () => {
  console.log("hello");
  const auth = localStorage.getItem("token");
  return auth ? <Navigate to={PATHS.root} /> : <Outlet />;
};
