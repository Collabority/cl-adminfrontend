import { useEffect, useState, useCallback } from "react";
import instance from "../../lib/axios";

const useGetAllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming your backend returns { data: { services: [...] } }
      const response = await instance.get("/services/all");
      setServices(response.data?.data?.services || []); 
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Return fetchServices as 'refetch'
  return { services, loading, error, refetch: fetchServices };
};

export default useGetAllServices;