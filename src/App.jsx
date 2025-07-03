import "./App.css";
import React, { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import { AppContext } from "./context/AppContext";

// Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BlogManagement = lazy(() => import("./pages/BlogManagement"));
const CreateBlogPost = lazy(() => import("./pages/CreateBlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(()=> import("./pages/Signup"))


const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {darkMode} = useContext(AppContext)

   // Check if current route is "/login"
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/sign-up"


  return (
    <div className={`h-screen flex flex-col ${darkMode && "dark"}`}>
      {!isLoginPage && !isSignupPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed height and no scroll */}
         {!isLoginPage && !isSignupPage && <Sidebar />}

        {/* Content area that scrolls if it overflows */}
        <div className="flex-1 overflow-y-auto p-4  bg-gray-100">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blog">
                  <Route index element={<BlogManagement />} />
                   <Route path="create-blog-post" element={<CreateBlogPost />} />
              </Route>
              
             
              <Route path="/login" element={<Login/>} />
              <Route path="/sign-up" element={<Signup/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
