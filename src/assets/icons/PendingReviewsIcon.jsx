import React from "react";

const PendingReviewsIcon = () => {
  return (
    <span className="bg-orange-100 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  );
};

export default PendingReviewsIcon;
