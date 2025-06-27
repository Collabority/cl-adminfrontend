import "./App.css";
import React, { Suspense, lazy,  useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";

// Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Reviews = lazy(() => import("./pages/Reviews"));
const AddReview = lazy(() => import("./pages/AddReview"));
const ContactQueries = lazy(() => import("./pages/ContactQueries"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Suspense fallback={<Loader />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed height and no scroll */}
        <Suspense fallback={<Loader />}>
          <Sidebar />
        </Suspense>

        {/* Content area that scrolls if it overflows */}
        <div className="flex-1 overflow-y-auto p-4  bg-gray-100">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/reviews/add" element={<AddReview />} />
              <Route path="/contact" element={<ContactQueries />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
