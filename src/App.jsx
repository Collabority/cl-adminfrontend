import "./App.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

// Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Reviews = lazy(() => import("./pages/Reviews"));
const AddReview = lazy(() => import("./pages/AddReview"));

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Suspense fallback={<Loader />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<Loader />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/reviews/add" element={<AddReview />} />
              {/* Add more routes as needed */}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
