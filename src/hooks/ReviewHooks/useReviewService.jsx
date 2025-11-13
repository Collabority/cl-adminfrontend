import { useState, useCallback } from "react";
import instance from "../../lib/axios";

export const useReviewService = () => {
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createReview = useCallback(async (reviewData) => {
    setCreating(true);
    try {
      const response = await instance.post("/reviews/create", reviewData);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Review creation failed."
      );
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
      throw new Error(
        error?.response?.data?.message || "Failed to fetch reviews."
      );
    } finally {
      setFetching(false);
    }
  }, []);

  const deleteReview = useCallback(async (reviewId) => {
    setDeleting(true);
    try {
      const response = await instance.delete(`/reviews/delete/${reviewId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Review deletion failed."
      );
    } finally {
      setDeleting(false);
    }
  }, []);

  const getReviewHighlights = useCallback(async () => {
    setFetching(true);
    try {
      const response = await instance.get("/reviews/getHighlights");
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch review highlights."
      );
    } finally {
      setFetching(false);
    }
  }, []);

  const updateStatus = useCallback(async (reviewId, newStatus) => {
    try {
      const response = await instance.put(`/reviews/updateStatus/${reviewId}`, {
        status: newStatus,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to update review status."
      );
    }
  }, []);

  const updateReview = useCallback(async (reviewId, updatedData) => {
    try {
      const response = await instance.put(
        `/reviews/update/${reviewId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to update review."
      );
    }
  }, []);

  return {
    createReview,
    getAllReviews,
    deleteReview,
    getReviewHighlights,
    updateStatus,
    updateReview,
    loading: {
      creating,
      fetching,
      deleting,
    },
  };
};
