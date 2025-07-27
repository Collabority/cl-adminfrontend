import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import BlogsCard from "../components/blog-components/BlogsCard";
import MiddleSection from "../components/blog-components/MiddleSection";
import TopSection from "../components/blog-components/TopSection";
import { transformBlogs } from "../utils/transformBlog";

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await axios.get("http://localhost:3000/blogs/all");

        const transformed = transformBlogs(response.data.data.blogs);
        setBlogPosts(transformed);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All Status" || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-end">
        <Link
          to="create-blog-post"
          className="flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          <FaPlus />
          Create New Post
        </Link>
      </div>

      {/* Top Section */}
      <TopSection />

      {/* Filters Section */}
      <MiddleSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {/* Blog Cards Section */}
      <BlogsCard filteredPosts={filteredPosts} />
    </div>
  );
};

export default BlogManagement;
