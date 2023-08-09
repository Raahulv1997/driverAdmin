import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const adminLogged = localStorage.getItem("admin_token");
  // const VendorLogged = localStorage.getItem("vendor_token");

  return adminLogged !== null ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  );
};

export default AuthWrapper;
