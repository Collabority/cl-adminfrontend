import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {
  Published: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Draft: "bg-gray-200 text-gray-600",
};

const ReviewRow = ({
  r,
  handleStatusChange,
  handleDelete,
  handleView,
  handleEdit,
}) => {
  return (
    <tr key={r._id || r.id} className="border-b last:border-b-0">
      <td className="py-3 px-4 flex items-center gap-3">
        <img
          src={r.profilePicture}
          alt={r.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm text-black">{r.name}</div>
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
          onChange={(e) => handleStatusChange(r._id, e.target.value)}
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
        <Link
          to={`/reviews/edit/${r._id}`}
          title="Edit"
          className="text-green-600 hover:text-green-800"
          state={{ review: r }}
        >
          <EditIcon className="h-4 w-4" />
        </Link>
        {/* <button title="Edit" className="text-green-600 hover:text-green-800">
          <EditIcon className="h-4 w-4" />
        </button> */}
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
  );
};
export { ReviewRow };
