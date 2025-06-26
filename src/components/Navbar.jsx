import React, { useContext } from "react";
import { MdNightlightRound } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from "../context/AppContext";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { activeTab, isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full border-b border-gray-300 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      {/* Left: Logo and Current Tab */}
      <div className="flex flex-col w-5/12  sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
        <h1 className="text-lg  sm:text-xl md:text-2xl font-bold text-black">
          Admin Portal
        </h1>
        <p className="text-sm  sm:text-base sm:w-5/12 text-gray-500 font-bold">
          {activeTab}
        </p>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <MdNightlightRound className="text-gray-500 text-xl sm:text-2xl cursor-pointer" />

        {/* Notification with red dot */}
        <div className="relative">
          <IoIosNotifications className="text-gray-500 text-xl sm:text-2xl cursor-pointer" />
          <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold">
            3
          </span>
        </div>

        {/* Hamburger Menu: Only visible on small screens */}
        {isSidebarOpen ? (
          <RxCross2
            onClick={toggleSidebar}
            className="text-gray-500 text-2xl sm:hidden cursor-pointer"
          />
        ) : (
          <GiHamburgerMenu
            onClick={toggleSidebar}
            className="text-gray-500 text-2xl sm:hidden cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
