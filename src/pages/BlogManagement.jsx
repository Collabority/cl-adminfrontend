import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import BlogsCard from "../components/blog-components/BlogsCard";
import MiddleSection from "../components/blog-components/MiddleSection";
import TopSection from "../components/blog-components/TopSection";
import { transformBlogs } from "../utils/transformBlog";
import instance from "../lib/axios";

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  
  // State for the number cards
  const [blogHighlights, setBlogHighlights] = useState({
    totalBlogs: 0,
    draftBlogs: 0,
    publishedBlogs: 0,
  });

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await instance.get(`/blogs/all?limit=100&t=${Date.now()}`);
        const rawData = response.data?.data?.blogs || [];
        const transformed = transformBlogs(rawData);
        
        setBlogPosts(transformed);
        const totalCount = response.data?.data?.pagination?.total || transformed.length;
        
        const draftCount = transformed.filter((b) => 
          (b.status || "").toLowerCase() === "draft"
        ).length;

        const publishedCount = transformed.filter((b) => 
          (b.status || "").toLowerCase() === "published"
        ).length;

        setBlogHighlights({
          totalBlogs: totalCount,
          draftBlogs: draftCount,
          publishedBlogs: publishedCount,
        });

      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    // Search Filter
    const matchesSearch = (post.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Category Filter
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;

    // Status Filter
    const matchesStatus =
      selectedStatus === "All Status" || 
      (post.status || "").toLowerCase() === selectedStatus.toLowerCase();

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

      {/* Top Section with dynamic data */}
      <TopSection blogHighlights={blogHighlights} />

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