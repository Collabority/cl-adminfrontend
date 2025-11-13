import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import instance from "../lib/axios";
import { login, logout } from "../redux/authSlice";

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuthStatus() {
      try {
        setError(null);
        const response = await instance.get("/admin/get-admin-data");

        // Better response validation
        if (response?.data?.success && response?.data?.data) {
          dispatch(login({ admin: response.data.data }));
        } else {
          dispatch(logout());
          setError("Invalid response from server");
        }
      } catch (error) {
        console.log("Failed to maintain auth:", error.message);
        dispatch(logout());
        setError(error.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    }

    getAuthStatus();
  }, [dispatch]);

  return { loading, error };
};
