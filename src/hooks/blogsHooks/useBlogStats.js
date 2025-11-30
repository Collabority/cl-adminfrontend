import { useState, useEffect, useCallback } from "react";
import instance from "../../lib/axios";

const useBlogStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch a large batch of blogs (Limit 100 to catch them all)
  
      const response = await instance.get(`/blogs/all?limit=100&t=${Date.now()}`);

      const blogs = response.data?.data?.blogs || [];
      const totalCount = response.data?.data?.pagination?.total || blogs.length || 0;

      const publishedCount = blogs.filter((b) => {
        const status = b.publishStatus || b.status || "";
        return status.toLowerCase() === "published";
      }).length;

      const draftCount = blogs.filter((b) => {
        const status = b.publishStatus || b.status || "";
        return status.toLowerCase() === "draft";
      }).length;

      setStats({
        total: totalCount,
        published: publishedCount,
        draft: draftCount,
      });

    } catch (err) {
      console.error("Error fetching blog stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetchStats: fetchStats };
};

export default useBlogStats;