// hooks/useAuthCheck.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import instance from "../lib/axios";
import { login, logout } from "../redux/authSlice";

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuthStatus() {
      try {
        const response = await instance.get("/admin/get-admin-data");
        if (!response) {
          dispatch(logout());
          throw new Error("Admin not authenticated");
        }
        dispatch(login({ admin: response.data.data }));
      } catch (error) {
        console.log("Failed to maintain auth:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getAuthStatus();
  }, [dispatch]);

  return loading;
};
