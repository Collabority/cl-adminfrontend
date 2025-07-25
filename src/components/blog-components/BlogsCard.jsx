import { MdDelete } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const BlogsCard = ({ filteredPosts }) => (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
    {filteredPosts.map((post, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
      >
        {/* Top Image */}
        <div className="relative">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <span
            className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
              post.status === "Published"
                ? "bg-green-100 text-green-700"
                : post.status === "Scheduled"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {post.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Category and Date */}
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>

          {/* Description */}
          <p className="text-base font-semibold text-gray-600 line-clamp-3">
            {post.desc}
          </p>

          {/* Footer: Author + Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <img
                src={post.authorImg}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-base font-medium text-gray-700">
                {post.author}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xl text-gray-500">
              <Link to={`edit-blog-post/${post.id}`}>
                <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" />
              </Link>
              <MdDelete className="cursor-pointer text-red-600 hover:text-red-800 transition" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default BlogsCard;
