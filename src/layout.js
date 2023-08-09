import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OrderList from "./component/admin/orderList";

import AdminLogin from "./component/admin/adminLoginSystem/AdminLogin";

import NotFound from "./component/common/notfound";
import DriverSignUp from "./component/driver/DriverSignUp";
import DriverLogin from "./component/driver/DriverLogin";
import DriverOtpVerify from "./component/driver/DriverOtpVerify";
import DriverForgetPassword from "./component/driver/DriverForgetPassword";
import UpdateDriverForgetPassword from "./component/driver/UpdateDriverForgetPassword";
import DriverRegister from "./component/driver/DriverRegister";
import AddDriver from "./component/admin/AddDriver";
import VehicleRegisterByAdmin from "./component/admin/vehicleRegisterByAdmin";
import OrderWithDriver from "./component/admin/OrderWithDriver";
import DriverWorkingArea from "./component/admin/DriverWorkingArea";
import ManageAdmin from "./component/admin/ManageAdmin";

import AdminForgetPassword from "./component/admin/adminLoginSystem/AdminForgetPassword";
import AuthWrapper from "./Authwrapper";

function Layout() {
  const adminLogged = localStorage.getItem("admin_token");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />

          <Route
            path="/Adminforgetpassword"
            element={<AdminForgetPassword />}
          />
          <Route path="/DriverSignup" element={<DriverSignUp />} />
          <Route path="/DriverRegister" element={<DriverRegister />} />
          <Route path="/DriverLogin" element={<DriverLogin />} />
          <Route path="/Driverotpverify" element={<DriverOtpVerify />} />
          <Route
            path="/Driverforgetpassword"
            element={<DriverForgetPassword />}
          />
          <Route
            path="/updateDriverForgetpassword"
            element={<UpdateDriverForgetPassword />}
          />
        </Routes>

        {adminLogged !== null ? (
          <Routes>
            {/* <Route element={<AuthWrapper />}> */}
            <Route path="/admin" element={<AddDriver />} />
            <Route path="/orderList" element={<OrderList />} />
            <Route path="/manageAdmin" element={<ManageAdmin />} />
            <Route
              path="/vehicleRegisterByadmin"
              element={<VehicleRegisterByAdmin />}
            />
            <Route path="/orderWithDriver" element={<OrderWithDriver />} />
            <Route path="/driverWorkingArea" element={<DriverWorkingArea />} />
            <Route path="*" element={<NotFound />} />
            {/* </Route> */}
          </Routes>
        ) : (
          console.log("in else admin")
        )}
      </Router>
    </div>
  );
}

export default Layout;
