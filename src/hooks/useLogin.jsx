import { useState } from "react";

import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/store/authSlice";
import instance from "../lib/axios";
import { login } from "../redux/authSlice";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginUser = async (data) => {
    setLoading(true);
    try {
      const response = await instance.post("/admin/login", data);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || "Registration failed.");
      }

      dispatch(login({ admin: response.data.data }));
      console.log("Successfully registered. Logging you in...");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed. Try again.";

      console.error("Login error:", message);
      //   toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return { loginUser, loading };
}

export { useLogin };
