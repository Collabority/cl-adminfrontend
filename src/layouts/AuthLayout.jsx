
import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AuthLayout = () => {
  const { darkMode } = useContext(AppContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/sign-up";

  return (
    <div className={`h-screen flex flex-col ${darkMode && "dark"}`}>
      {!isLoginPage && !isSignupPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {!isLoginPage && !isSignupPage && <Sidebar />}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
