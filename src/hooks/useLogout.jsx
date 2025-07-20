import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import instance from "../lib/axios";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await instance.post("/admin/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return logoutUser;
};
