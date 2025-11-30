import { useState } from "react";
import instance from "../../lib/axios";

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const createService = async (formData, isDraft = false) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);

      // Ensure status is set
      formData.set("status", isDraft ? "Draft" : "Published");

      const response = await instance.post("/services/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
        // RETURN DATA ON SUCCESS
        return response.data;
      } else {
        throw new Error("Service creation failed");
      }
    } catch (err) {
      console.error("Error creating service:", err);
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess(false);
      // RETURN NULL ON FAILURE
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading, error, success };
};

export { useCreateService };