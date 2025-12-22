import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import instance from "../lib/axios";
import { logout, setCredentials } from "../redux/authSlice"; 

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuthStatus() {
      try {
        setError(null);
        // 1. Get Token from storage to pass back to Redux
        const token = localStorage.getItem("token");

        if (!token) {
           throw new Error("No token found");
        }

        const response = await instance.get("/admin/get-admin-data");

        // 2. Validate and Dispatch
        // Your API response structure is { data: { ...user }, message: "..." }
        if (response?.data?.data) {
          
          dispatch(setCredentials({ 
            user: response.data.data, // Map 'data' to 'user'
            token: token              // Pass the token explicitly
          }));
          
        } else {
          throw new Error("Invalid response data");
        }

      } catch (error) {
        console.log("Auth Check Failed:", error.message);
        dispatch(logout());
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getAuthStatus();
  }, [dispatch]);

  return { loading, error };
};