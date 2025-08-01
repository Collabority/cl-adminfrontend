import { useState, useCallback } from "react";
import instance from "../../lib/axios";

export const useReviewService = () => {
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(false);

  
  const createReview = useCallback(async (reviewData) => {
    setCreating(true);
    try {
      const response = await instance.post("/reviews/create", reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Review creation failed.");
    } finally {
      setCreating(false);
    }
  }, []);


  const getAllReviews = useCallback(async () => {
    setFetching(true);
    try {
      const response = await instance.get("/reviews/getAll");
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to fetch reviews.");
    } finally {
      setFetching(false);
    }
  }, []);

  return {
    createReview,
    getAllReviews,
    loading: {
      creating,
      fetching,
    },
  };
};
