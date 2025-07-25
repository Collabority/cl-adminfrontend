import { FaBlog } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import BlogsCard from "../components/blog-components/BlogsCard";
import MiddleSection from "../components/blog-components/MiddleSection";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    desc: "Explore the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.",
    category: "Technology",
    status: "Published",
    date: "Jan 8, 2025",
    author: "John Smith",
    img: "https://www.kidpid.com/wp-content/uploads/2018/04/pexels-photo-546819.jpeg",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Creating Intuitive User Experiences: A Designer's Guide",
    desc: "Learn the essential principles of UX design and how to create interfaces that users love to interact with.",
    category: "Design",
    status: "Draft",
    date: "Draft",
    author: "Sarah Johnson",
    img: "https://www.researchgate.net/publication/328284724/figure/fig2/AS:681977464238081@1539607506279/Design-change-drawings-for-simple-electrical-box.jpg",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    title: "Building Successful Digital Products: From Idea to Launch",
    desc: "A comprehensive guide to product development, covering everything from market research to successful product launches.",
    category: "Business",
    status: "Published",
    date: "Jan 6, 2025",
    author: "Michael Chen",
    img: "https://analyticstraininghub.com/wp-content/uploads/2021/07/Power-BI-Charts-Image-2.jpeg",
    authorImg: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    title: "Digital Marketing Strategies That Actually Work in 2025",
    desc: "Discover proven marketing strategies and tactics that will help your business grow in the digital landscape.",
    category: "Marketing",
    status: "Scheduled",
    date: "Jan 12, 2025",
    author: "Emily Davis",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgfJRNSMLGDuVOi4Z5jtua2OuisrDdq-IMg&s",
    authorImg: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 5,
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    desc: "Explore how artificial intelligence and machine learning are revolutionizing various industries and what it means for the future.",
    category: "Technology",
    status: "Draft",
    date: "Draft",
    author: "David Wilson",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD_13L3xjR5WPeiG2WijJwOrqobRqYKithRw&s",
    authorImg: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // filter blog posts
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

  const cardStyle =
    "flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white";

  const topSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Total Posts */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Total Posts</h2>
          <h1 className="text-2xl font-bold">42</h1>
        </div>

        <FaBlog className="text-2xl text-blue-600" />
      </div>

      {/* published */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Published</h2>
          <h1 className="text-2xl font-bold text-green-600">35</h1>
        </div>

        <FaRegCheckCircle className="text-2xl text-green-600" />
      </div>

      {/* Drafts */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Drafts</h2>
          <h1 className="text-2xl font-bold text-red-600">7</h1>
        </div>

        <PiNotePencilBold className="text-2xl text-red-600" />
      </div>

      {/* Featured */}
      <div className={cardStyle}>
        <div>
          <h2 className="text-sm text-gray-600 font-semibold">Reviews</h2>
          <h1 className="text-2xl font-bold text-purple-500">8</h1>
        </div>

        <FaStar className="text-2xl text-purple-500" />
      </div>
    </div>
  );

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
      {/* ------- Top Section ------- */}
      {topSection()}
      {/*-------------middile filters section ------------- */}
      <MiddleSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      {/* -----------------bottom section---------------- */}
      {/* -------------bottom blog cards section---------- */}
      {<BlogsCard filteredPosts={filteredPosts} />}
    </div>
  );
};

export default BlogManagement;
