import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // or your own auth context
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AuthLayout = ({ authenticationReq = true, children }) => {
  const { darkMode } = useContext(AppContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/sign-up";

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 🛡️ Redirect unauthenticated users from protected pages
  if (authenticationReq && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 🚫 Redirect already logged-in users from login/signup
  if (!authenticationReq && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // ✅ Auth is fine, show layout
  return (
    <div className={`h-screen flex flex-col ${darkMode && "dark"}`}>
      {!isLoginPage && !isSignupPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {!isLoginPage && !isSignupPage && <Sidebar />}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
