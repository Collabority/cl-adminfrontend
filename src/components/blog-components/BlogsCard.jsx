import { MdDelete } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";

const BlogsCard = ({ filteredPosts }) => {
  
  const handleDeleteBlog = async (postId) => {
    // 1. Safety Check
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      await instance.delete(`/blogs/delete/${postId}`);
      alert("Blog post deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert(error.response?.data?.message || "Error deleting blog post");
    }
  };

  const getAuthorName = (post) => {
    // 1. Check for direct authorDisplay field
    if (post.authorDisplay) return post.authorDisplay;

    // 2. If author is an object (Direct from Backend Populate)
    const author = post.author;
    if (typeof author === 'object' && author !== null) {
        // Admin Model has 'name'
        if (author.name) return author.name;
        // User Model has 'firstname' + 'lastname'
        if (author.firstname) return `${author.firstname} ${author.lastname || ""}`;
    }

    // 3. If author is just a string (Legacy data)
    if (typeof author === 'string' && author.trim() !== "") return author;

    return "Unknown Author";
  };

  const getAuthorImage = (post) => {
     // Check all possible image locations
     if (post.authorImg) return post.authorImg;
     if (post.author?.profilePicture) return post.author.profilePicture;
     // Fallback Avatar
     return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
  };

  if (!filteredPosts?.length) {
    return <div className="text-gray-500 text-center py-10">No blogs found.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredPosts.map((post) => {
        // Safety checks
        const validId = post._id || post.id;
        const status = (post.status || "draft").toLowerCase();

        return (
          <div
            key={validId}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full"
          >
            {/* Top Image */}
            <div className="relative h-48">
              <img
                src={post.img || post.coverImage || "https://via.placeholder.com/400x200"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-bold capitalize ${
                  status === "published"
                    ? "bg-green-100 text-green-700"
                    : status === "scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col flex-grow gap-2">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>{post.category || "General"}</span>
                <span>
                    {post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "")}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {post.title}
              </h2>

              <div className="text-sm font-medium text-gray-600 line-clamp-3 mb-2">
                {/* Handle HTML content if description is rich text, or plain text */}
                {post.desc || post.metaDescription || (post.content ? post.content.replace(/<[^>]*>?/gm, '') : "")}
              </div>

              {/* Spacer pushes footer to bottom */}
              <div className="mt-auto"></div>

              {/* Footer: Author + Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={getAuthorImage(post)}
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-sm font-semibold text-gray-700 capitalize">
                    {getAuthorName(post)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xl text-gray-500">
                  <Link 
                    to={`edit-blog-post/${validId}`} 
                    state={{ post }} 
                  >
                    <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" title="Edit" />
                  </Link>
                  
                  <button onClick={() => handleDeleteBlog(validId)}>
                    <MdDelete className="cursor-pointer text-red-600 hover:text-red-800 transition" title="Delete" />
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