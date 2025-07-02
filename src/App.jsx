import "./App.css";
import React, { Suspense, lazy,  useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

// Lazy loaded components
const Reviews = lazy(() => import("./pages/Reviews"));
const AddReview = lazy(() => import("./pages/AddReview"));
const ContactQueries = lazy(() => import("./pages/ContactQueries"));

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Content area that scrolls if it overflows */}
        <div className="flex-1 overflow-y-auto p-4  bg-gray-100">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Navigate to="/reviews" replace />} />
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
