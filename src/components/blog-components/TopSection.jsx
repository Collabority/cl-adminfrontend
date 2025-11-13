import { FaBlog, FaRegCheckCircle, FaStar } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";

const TopSection = ({ blogHighlights }) => {
  const cardStyle =
    "flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white";

  // Use fallback if blogHighlights is not provided
  const {
    totalBlogs = 0,
    publishedBlogs = 0,
    draftBlogs = 0,
    featuredBlogs = 0,
    reviews = 0,
  } = blogHighlights || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Total Posts */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Total Posts</h2>
          <h1 className="text-2xl font-bold">{totalBlogs}</h1>
        </div>

        <FaBlog className="text-2xl text-blue-600" />
      </div>

      {/* Published */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Published</h2>
          <h1 className="text-2xl font-bold text-green-600">
            {publishedBlogs}
          </h1>
        </div>

        <FaRegCheckCircle className="text-2xl text-green-600" />
      </div>

      {/* Drafts */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Drafts</h2>
          <h1 className="text-2xl font-bold text-red-600">{draftBlogs}</h1>
        </div>

        <PiNotePencilBold className="text-2xl text-red-600" />
      </div>

      {/* Reviews (optional, fallback to 0 if not provided) */}
      {/* <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Reviews</h2>
          <h1 className="text-2xl font-bold text-purple-500">{reviews}</h1>
        </div>

        <FaStar className="text-2xl text-purple-500" />
      </div> */}
    </div>
  );
};

export default TopSection;
