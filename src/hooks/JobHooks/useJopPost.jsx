import { useState } from "react";
import instance from "../../lib/axios";

function useJobPost() {
  // Custom hook logic for job posting
  const [loading, setLoading] = useState(false);

  const postJob = async (jobDetails) => {
    setLoading(true);
    try {
      // Logic to post a job
      const response = await instance.post("/career/create-job", jobDetails);

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to post job");
      }
      console.log("Job posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };
  return { postJob, loading };
}
export { useJobPost };
