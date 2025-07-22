import { useState } from "react";
import instance from "../../lib/axios";

function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const createBlog = async (data) => {
    setLoading(true);
    try {
      const response = await instance.post("/blogs/createblog", data);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || "Blog creation failed.");
      }

      console.log("Blog created successfully:", response.data);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Blog creation failed. Try again.";

      console.error("Blog creation error:", message);
    } finally {
      setLoading(false);
    }
  };
  return { createBlog, loading };
}

export { useCreateBlog };
