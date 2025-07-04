import React from "react";
import { FaBlog } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const blogPosts = [
  {
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

  const middleSection = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-gray-300 rounded-xl bg-white shadow-sm w-full">
      {/* Left section: search and filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full">
        {/* Search bar */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto">
          <IoMdSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search blog posts..."
            className="outline-none bg-transparent w-full sm:w-60 font-semibold"
          />
        </div>

        {/* Category select */}
        <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Design</option>
          <option>Business</option>
          <option>Marketing</option>
        </select>

        {/* Status select */}
        <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
        </select>
      </div>

      {/* Right section: icons */}
      <div className="flex items-center gap-4 text-gray-600 text-xl self-end md:self-auto">
        <FaFilter className="cursor-pointer hover:text-black transition" />
        <LuRefreshCw className="cursor-pointer hover:text-black transition" />
      </div>
    </div>
  );

  const BlogCardS = () => (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogPosts.map((post, index) => (
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
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-sm font-semibold text-gray-600 line-clamp-3">
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
                <span className="text-sm font-medium text-gray-700">
                  {post.author}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xl text-gray-500">
                <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" />
                <MdDelete className="cursor-pointer text-red-600 hover:text-red-800 transition" />
              </div>
            </div>
          </div>
        </div>
      ))}
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
      {middleSection()}

      {/* -----------------bottom section---------------- */}
      {/* -------------bottom blog cards section---------- */}
      {BlogCardS()}
    </div>
  );
};

export default BlogManagement;