import React, { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const context = useContext(Context);

  const location = useLocation();

  return context.userDetails.token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={"/login"} />
  );
};

export default Auth;
