// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/authSlice";
// import instance from "../lib/axios";

// export const useLogout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutUser = async () => {
//     try {
//       await instance.post("/admin/logout");
//       dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error.message);
//     }
//   };

//   return logoutUser;
// };


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../lib/axios";
import { logout as logoutAction } from "../redux/authSlice"; // Rename to avoid conflict

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 1. Call Backend to clear cookies
      // We use the new /auth/logout route
      await instance.post("/auth/logout");
    } catch (error) {
      console.error("Logout Error:", error);
      // We ignore the error and force logout on frontend anyway
    } finally {
      // 2. Clear Frontend State (Redux + LocalStorage)
      dispatch(logoutAction()); 
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      
      // 3. Redirect
      navigate("/login");
    }
  };

  return logout;
};