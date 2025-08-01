import { useState } from "react";
import instance from "../../lib/axios";

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const createService = async (serviceData) => {
    try {
      setLoading(true);
      const response = await instance.post("/services/create", serviceData);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || "Service creation failed.");
      }
    } catch (error) {
      console.error("Error creating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading };
};
export { useCreateService };
