import { MdDelete } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";

const BlogsCard = ({ filteredPosts }) => {
  
  const handleDeleteBlog = async (postId) => {
    // 1. Safety Check: Ask user before deleting
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      console.log("Attempting to delete ID:", postId); // Debugging log

      await instance.delete(`/blogs/delete/${postId}`);

      alert("Blog post deleted successfully");
      window.location.reload();

    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert(error.response?.data?.message || "Error deleting blog post");
    }
  };

  if (!filteredPosts?.length) {
    return <div className="text-gray-500">No blogs found.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredPosts.map((post, index) => {
        // 3. ID FIX: MongoDB uses '_id'. Your transform might use 'id'.
        // We check both to be safe.
        const validId = post._id || post.id;

        return (
          <div
            key={validId} // Use ID as key, not index (better for React)
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Top Image */}
            <div className="relative">
              <img
                src={post.img || post.coverImage} // Fallback support
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
                  post.status === "published" // Check casing (usually lowercase in DB)
                    ? "bg-green-100 text-green-700"
                    : post.status === "scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {post.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>{post.category}</span>
                <span>{post.date || post.publishedDate}</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>

              <p className="text-base font-semibold text-gray-600 line-clamp-3">
                {post.desc || post.metaDescription || post.content}
              </p>

              {/* Footer: Author + Actions */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <img
                    // Handle missing author image safely
                    src={post.authorImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                    alt={post.author || "Admin"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-base font-medium text-gray-700">
                    {post.author || "Admin"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xl text-gray-500">
                  {/* EDIT LINK */}
                  <Link 
                    to={`edit-blog-post/${validId}`} // Use validId here
                    state={{ post }} 
                  >
                    <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" />
                  </Link>
                  
                  {/* DELETE BUTTON */}
                  <button onClick={() => handleDeleteBlog(validId)}>
                    <MdDelete className="cursor-pointer text-red-600 hover:text-red-800 transition" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogsCard;