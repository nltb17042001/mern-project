import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return isAuthenticated ? (
    <>
      <NavbarMenu></NavbarMenu>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
