// src/context/AppContext.js
import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <AppContext.Provider
      value={{ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Export consistently (no mixing types)
export { AppContext, AppProvider };
