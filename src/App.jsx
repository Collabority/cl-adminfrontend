import "./App.css";

import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";


// Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
// const Applications = lazy(() => import("./pages/Careers/Applications"));
// const CreateJob = lazy(() => import("./pages/Careers/CreateJob"));
const NewsletterManagement = lazy(() => import("./pages/NewsletterManagement"));
const AddSubscriber = lazy(() => import("./pages/AddSubscriber"));
// const AddNewUser = lazy(() => import("./pages/UserManagement/AddNewUser"));
// const UserManagementPage = lazy(() => import("./pages/UserManagement/UserManagementPage"));





const App = () => {
  const location = useLocation();
  const navigate = useNavigate()

   // Check if current route is "/login"
  const isLoginPage = location.pathname === "/login";


  return (
    <div className="h-screen flex flex-col">
      {!isLoginPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed height and no scroll */}
         {!isLoginPage && <Sidebar />}

        {/* Content area that scrolls if it overflows */}
        <div className="flex-1 overflow-y-auto p-4  bg-gray-100">
          <Suspense fallback={<Loader />}>
            <Routes>
            {/* <Route path="/careers">
              <Route index element={<Applications />} />
              <Route path="create" element={<CreateJob />} />
            </Route> */}
            <Route path="/newsletter" element={<NewsletterManagement />} />
            <Route path="/newsletter/add-subscriber" element={<AddSubscriber />} />
            {/* <Route path="/users">
              <Route index element={<UserManagementPage />} />
              <Route path="roles" element={<AddNewUser />} />
            </Route> */}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;


