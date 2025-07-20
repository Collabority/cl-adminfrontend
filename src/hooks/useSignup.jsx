import { useState } from "react";
import instance from "../lib/axios";

export function useSignUp() {
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    setLoading(true);

    try {
      // Register admin
      const registerRes = await instance.post("/admin/register", data);

      if (registerRes.status < 200 || registerRes.status >= 300) {
        throw new Error(registerRes.data?.message || "Registration failed.");
      }

      console.log("Successfully registered. Logging you in...");

      // Auto-login after registration
      const loginRes = await axios.post("/admin/login", {
        email: data.email,
        password: data.password,
      });

      if (loginRes.status < 200 || loginRes.status >= 300) {
        throw new Error(loginRes.data?.message || "Login after signup failed.");
      }

      // Optionally, handle storing tokens or redirecting here
      // Example: localStorage.setItem("token", loginRes.data.token);
    } catch (error) {
      // Handle axios and generic errors
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
