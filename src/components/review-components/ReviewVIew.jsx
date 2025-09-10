const ReviewView = ({ viewingReview, setViewingReview }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md pointer-events-auto">
        <h2 className="text-lg font-bold mb-4">Review Details</h2>
        <div className="mb-2">
          <strong>Name:</strong> {viewingReview.name}
        </div>
        <div className="mb-2">
          <strong>Title:</strong>{" "}
          {viewingReview.designation || viewingReview.title}{" "}
          {viewingReview.companyName ? `at ${viewingReview.companyName}` : ""}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {viewingReview.email}
        </div>
        <div className="mb-2">
          <strong>Rating:</strong> {"★".repeat(viewingReview.rating)}
          {"☆".repeat(5 - viewingReview.rating)} ({viewingReview.rating})
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {viewingReview.status}
        </div>
        <div className="mb-2">
          <strong>Review:</strong>
          <p className="mt-1 text-gray-700">{viewingReview.reviewContent}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded text-base hover:bg-blue-600 transition"
            onClick={() => setViewingReview(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { ReviewView };
