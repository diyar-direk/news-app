import React, { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminAuth = () => {
  const context = useContext(Context);
  const isAdmin = context.userDetails.isAdmin;
  const locatin = useLocation();
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: locatin }} replace to={"/dashboard"} />
  );
};

export default AdminAuth;
