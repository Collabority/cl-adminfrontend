import { useState } from "react";
import instance from "../../lib/axios";

export const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // We removed 'isDraft' param. The hook just sends whatever data it gets.
  const createService = async (serviceData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      // ✅ Send the FormData directly
      const response = await instance.post("/services/create", serviceData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
        // Return data so the Component knows to navigate
        return response.data; 
      }
    } catch (err) {
      console.error("Create Service Error:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      // Return null so the Component knows it failed
      return null; 
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading, error, success };
};