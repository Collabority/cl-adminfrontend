import { useState } from "react";
import instance from "../lib/axios";
import { useLogin } from "./useLogin";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useLogin();

  const signup = async (data) => {
    setLoading(true);

    try {
      const registerRes = await instance.post("/admin/register", data);

      if (registerRes.status < 200 || registerRes.status >= 300) {
        throw new Error(registerRes.data?.message || "Registration failed.");
      }

      console.log("Successfully registered. Logging you in...");

      const loginRes = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (loginRes.status < 200 || loginRes.status >= 300) {
        throw new Error(loginRes.data?.message || "Login after signup failed.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed. Try again.";
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}
