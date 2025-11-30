import { useState, useEffect, useCallback } from "react";
import instance from "../../lib/axios";

const useServiceStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch the latest 50 services (Max limit allowed by your backend)
      const response = await instance.get("/services/all?limit=50");
      const services = response.data?.data?.services || [];
      const totalCount = response.data?.data?.pagination?.total || 0;

      // 2. Count them manually in JavaScript (Client-side filtering)
      // Note: We use 'publishStatus' because that is what your Schema returns
      const publishedCount = services.filter(
        (s) => s.publishStatus === "Published"
      ).length;

      const draftCount = services.filter(
        (s) => s.publishStatus === "Draft"
      ).length;

      setStats({
        total: totalCount,
        published: publishedCount,
        draft: draftCount,
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetchStats: fetchStats };
};

export default useServiceStats;