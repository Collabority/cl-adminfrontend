import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const getTabNameFromPath = (pathname) => {
  if (pathname === "/") return "Dashboard";

  if (pathname.startsWith("/blog")) return "Blog Management";

  if (pathname.startsWith("/careers")) return "Careers";

  if (pathname.startsWith("/services")) return "Services";

  if (pathname.startsWith("/reviews")) return "Reviews";

  if (pathname.startsWith("/contact")) return "Contact Queries";

  if (pathname.startsWith("/newsletter")) return "Newsletter";

  if (pathname.startsWith("/users")) return "User Management";

  return "Dashboard";
};

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getTabNameFromPath(location.pathname)
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🔁 Automatically update activeTab when route changes
  useEffect(() => {
    const tabName = getTabNameFromPath(location.pathname);
    setActiveTab(tabName);
  }, [location.pathname]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setIsSidebarOpen,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
