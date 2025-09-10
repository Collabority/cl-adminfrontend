import { FaUserCircle, FaTimes } from "react-icons/fa";

const ReviewView = ({ viewingReview, setViewingReview }) => {
  if (!viewingReview) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-gray-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
          onClick={() => setViewingReview(null)}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center mb-6">
          <img
            src={viewingReview.profilePicture}
            alt={viewingReview.name}
            className="w-24 h-24 rounded-full mb-2"
          />
          {/* <FaUserCircle className="text-gray-300 text-6xl mb-2" /> */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {viewingReview.name || "No Name"}
          </h2>
          <span className="text-sm text-gray-500">{viewingReview.email}</span>
        </div>
        <div className="divide-y divide-gray-100">
          <DetailRow
            label="Title"
            value={
              (viewingReview.designation || viewingReview.title || "-") +
              (viewingReview.companyName
                ? ` at ${viewingReview.companyName}`
                : "")
            }
          />
          <DetailRow
            label="Rating"
            value={
              <span className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">
                  {"★".repeat(viewingReview.rating)}
                  {"☆".repeat(5 - viewingReview.rating)}
                </span>
                <span className="ml-2 text-gray-700 font-medium">
                  ({viewingReview.rating})
                </span>
              </span>
            }
          />
          <DetailRow label="Status" value={viewingReview.status || "-"} />
          <div className="py-3">
            <span className="text-gray-500 font-medium">Review:</span>
            <p className="mt-1 text-gray-800 whitespace-pre-line">
              {viewingReview.reviewContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export { ReviewView };
