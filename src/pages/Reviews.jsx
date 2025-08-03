import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviewService } from "../hooks/ReviewHooks/useReviewService";
import TotalReviewsIcon from "../assets/icons/TotalReviewsIcon";
import AverageReviewsIcon from "../assets/icons/AverageReviewsIcon";
import PublishedReviewsIcon from "../assets/icons/PublishedReviewsIcon";
import PendingReviewsIcon from "../assets/icons/PendingReviewsIcon";

const statusColors = {
  Published: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Draft: "bg-gray-200 text-gray-600",
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const {
    getAllReviews,
    updateReview,
    deleteReview,
    updateStatus,
    getReviewHighlights,
  } = useReviewService();

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [highlights, setHighlights] = useState(null);

  // Fetch reviews and highlights when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await getAllReviews();
        const highlightsRes = await getReviewHighlights();
        setReviews(response.data?.reviews || []);
        setHighlights(highlightsRes?.data || {});
      } catch (error) {
        setApiError("Failed to fetch reviews.");
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [getAllReviews, getReviewHighlights]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const navigate = useNavigate();
  const [editingReview, setEditingReview] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    review: "",
    rating: 1,
    status: "Published",
  });

  // Dynamic stats for topbar
  const totalReviews = highlights?.totalReviews ?? reviews.length;
  const publishedCount =
    highlights?.published ??
    reviews.filter((r) => r.status === "Published").length;
  const pendingCount =
    highlights?.pending ?? reviews.filter((r) => r.status === "Pending").length;
  const draftCount =
    highlights?.draft ?? reviews.filter((r) => r.status === "Draft").length;
  const avgRating =
    highlights?.averageRating ??
    (reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0");

  const reviewStats = [
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: <TotalReviewsIcon />,
      sub: highlights?.totalReviewsChange
        ? `${highlights.totalReviewsChange > 0 ? "+" : ""}${
            highlights.totalReviewsChange
          }% from last month`
        : "",
      subClass:
        highlights?.totalReviewsChange > 0
          ? "text-green-600"
          : highlights?.totalReviewsChange < 0
          ? "text-red-600"
          : "text-gray-500",
    },
    {
      label: "Average Rating",
      value: avgRating,
      icon: <AverageReviewsIcon />,
      sub: (
        <span className="flex text-yellow-400">
          {"★".repeat(Math.round(avgRating))}
          {"☆".repeat(5 - Math.round(avgRating))}
        </span>
      ),
    },
    {
      label: "Published",
      value: publishedCount,
      icon: <PublishedReviewsIcon />,
      sub: totalReviews
        ? `${((publishedCount / totalReviews) * 100).toFixed(0)}% of total`
        : "0%",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: <PendingReviewsIcon />,
      sub: `${pendingCount} awaiting`,
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: <TotalReviewsIcon />,
      sub: `${draftCount} drafts`,
    },
  ];

  // Filtering
  const filtered = reviews.filter(
    (r) =>
      (status === "All" || r.status === status) &&
      (rating === "All" || r.rating === Number(rating)) &&
      (r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.reviewContent?.toLowerCase().includes(search.toLowerCase()))
  );

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Newest First") {
      return (b.date ? new Date(b.date) : 0) - (a.date ? new Date(a.date) : 0);
    }
    if (sort === "Oldest First") {
      return (a.date ? new Date(a.date) : 0) - (b.date ? new Date(b.date) : 0);
    }
    if (sort === "Highest Rated") {
      return b.rating - a.rating;
    }
    if (sort === "Lowest Rated") {
      return a.rating - b.rating;
    }
    return 0;
  });

  // Persist status change to backend
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setReviews((reviews) =>
        reviews.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      setApiError("Failed to update status.");
    }
  };

  // View review
  const handleView = (r) => {
    alert(
      `Review Details:\n\nName: ${r.name}\nTitle: ${
        r.designation || r.title
      }\nCompany: ${r.companyName || ""}\nRating: ${r.rating}\nReview: ${
        r.reviewContent
      }\nStatus: ${r.status}`
    );
  };

  // Reply to review
  const handleReply = (r) => {
    alert(`Reply to: ${r.name} (${r.title || r.designation})`);
    if (r.email) {
      window.location.href = `mailto:${r.email}`;
    }
  };

  // Edit review
  const handleEdit = (r) => {
    setEditingReview(r._id);
    setEditForm({
      name: r.name,
      title: r.designation || r.title,
      review: r.reviewContent || r.review,
      rating: r.rating,
      status: r.status,
    });
  };

  // Persist edit to backend
  const handleEditSave = async () => {
    try {
      await updateReview(editingReview, editForm);
      setReviews((reviews) =>
        reviews.map((r) =>
          r._id === editingReview ? { ...r, ...editForm } : r
        )
      );
      setEditingReview(null);
      alert("Review updated successfully!");
    } catch (err) {
      setApiError("Failed to update review.");
    }
  };

  // Persist delete to backend
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        setReviews((reviews) => reviews.filter((r) => r._id !== id));
      } catch (err) {
        setApiError("Failed to delete review.");
      }
    }
  };

  // Loading and error UI
  if (isLoading) {
    return <div className="p-4 text-center">Loading reviews...</div>;
  }
  if (apiError) {
    return <div className="p-4 text-center text-red-600">{apiError}</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Topbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Reviews &amp; Testimonials</span>
          <svg
            className="mx-2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-black font-bold">All Reviews</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 sm:px-5 py-2 font-bold transition text-base shadow-sm w-full sm:w-auto"
            onClick={() => navigate("/reviews/add")}
          >
            <svg
              className="w-6 h-6 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Review
          </button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {reviewStats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
              {s.icon}
              <span>{s.label}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{s.value}</div>
            {s.sub && (
              <div className={`text-xs ${s.subClass || "text-gray-500"}`}>
                {s.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Search & filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:flex-wrap md:gap-4 md:items-center gap-3 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row md:flex-wrap gap-2 md:gap-4 w-full">
          <div className="relative w-full sm:w-72 md:w-64 min-w-0 flex-1">
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
          </div>
          <select
            className="border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-3 w-full sm:w-auto md:w-40 min-w-0 flex-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            className="border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-3 w-full sm:w-auto md:w-40 min-w-0 flex-1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow p-2 sm:p-4 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Reviews & Testimonials
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b">
                <th className="py-2 px-4 text-left">Reviewer</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left">Review</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r._id || r.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={r.profilePicture}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm text-black">
                        {r.name}
                      </div>
                      <div className="text-gray-400 text-xs ">
                        {r.designation || r.title || "Reviewer"},{" "}
                        {r.companyName || "Company"}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-yellow-400">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                    <span className="ml-2 font-medium text-sm text-black">
                      {Number(r.rating).toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-black text-sm max-w-xs truncate">
                    {r.reviewContent || r.review}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none ${
                        statusColors[r.status]
                      }`}
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r._id, e.target.value)
                      }
                      style={{ minWidth: 90 }}
                    >
                      <option value="Published">Published</option>
                      <option value="Pending">Pending</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <button
                      title="View"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleView(r)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      title="Edit"
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEdit(r)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5h2m2 0h.01M17 5a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2m2 0V3m0 2v2"
                        />
                      </svg>
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(r._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-400 py-6 text-base"
                  >
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Review</h2>
            <div className="mb-2">
              <label className="block text-base font-semibold">Name</label>
              <input
                className="w-full border rounded px-2 py-1 text-base"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-semibold">Title</label>
              <input
                className="w-full border rounded px-2 py-1 text-base"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-semibold">Review</label>
              <textarea
                className="w-full border rounded px-2 py-1 text-base"
                value={editForm.review}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, review: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-semibold">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-16 border rounded px-2 py-1 text-base"
                value={editForm.rating}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, rating: Number(e.target.value) }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-semibold">Status</label>
              <select
                className="w-full border rounded px-2 py-1 text-base"
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-base"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded text-base"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Reviews };
export default Reviews;
