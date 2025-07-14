import React from "react";
import { FaBlog, FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const recentBlogPosts = [
  {
    title: "Getting Started with React Hooks",
    status: "Published",
    time: "2 days ago",
    thumbnail:
      "https://www.orientsoftware.com/Themes/Content/Images/blog/2024-05-08/react-custom-hooks-thumbnail.webp",
  },
  {
    title: "Advanced CSS Techniques",
    status: "Draft",
    time: "1 week ago",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgq3ySvdsfVDPeTC_Ep4mrnpifaii2-PQtRQ&s",
  },
  {
    title: "JavaScript Best Practices",
    status: "Published",
    time: "1 week ago",
    thumbnail:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/master-javascript-programming-beginner-friend-design-template-057f79a6b5ce0bbbaf0a2a579865a4fc_screen.jpg?ts=1683752393",
  },
];

const recentApplications = [
  {
    name: "John Smith",
    role: "Frontend Developer",
    time: "2 hours ago",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "UX Designer",
    time: "4 hours ago",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike Wilson",
    role: "Backend Developer",
    time: "6 hours ago",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const Dashboard = () => {
  const cardStyle =
    "flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white";

  const quickActionsCardStyle =
    "border border-gray-200 shadow-sm rounded-xl p-4 bg-white hover:bg-blue-100 cursor-pointer";

  const navigate = useNavigate();

  const iconWrapper = (icon, bgColor) => (
    <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
  );

  const quickActionsCard = (iconColor, iconBgColor, heading, text) => (
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${iconBgColor}`}>
        <LuPlus className={`${iconColor} text-3xl`} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-700">{heading}</h3>
        <p className="text-base text-gray-500 font-semibold">{text}</p>
      </div>
    </div>
  );

  const MiddleSection = () => (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* ------- Quick Actions (70%) -------- */}
      <div className="w-full lg:w-[70%] border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Create Blog Post */}
          <div
            className={quickActionsCardStyle}
            onClick={() => navigate("/blog/create-blog-post")}
          >
            {quickActionsCard(
              "text-blue-600",
              "bg-blue-100",
              "Create Blog Post",
              "Write new article"
            )}
          </div>

          {/* Add Job Opening */}
          <div
            className={quickActionsCardStyle}
            onClick={() => navigate("/careers/create")}
          >
            {quickActionsCard(
              "text-green-600",
              "bg-green-100",
              "Add Job Opening",
              "Post new position"
            )}
          </div>

          {/* Add Service */}
          <div
            className={quickActionsCardStyle}
            onClick={() => navigate("/services/create")}
          >
            {quickActionsCard(
              "text-purple-600",
              "bg-purple-100",
              "Add Service",
              "Create new service"
            )}
          </div>

          {/* Add Review */}
          <div
            className={quickActionsCardStyle}
            onClick={() => navigate("/reviews/add")}
          >
            {quickActionsCard(
              "text-yellow-600",
              "bg-yellow-100",
              "Add Review",
              "Create testimonial"
            )}
          </div>
        </div>
      </div>

      {/* ------- Recent Activity (30%) -------- */}
      <div className="w-full lg:w-[30%] border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Recent Activity
        </h2>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-100 flex justify-center items-center h-10 w-10">
            <FaBlog className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              New blog post published
            </p>
            <p className="text-xs font-semibold text-gray-500">
              "Getting started with React"
              <span className="text-gray-600"> - 2 hours ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const bottomSection = () => (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Recent Blog Posts */}
      <div className="w-full lg:w-1/2 border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Recent Blog Posts</h2>
          <button className="text-blue-600 text-base font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {recentBlogPosts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex gap-3 items-start sm:items-center w-full sm:w-auto">
                <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold ${
                      post.status === "Draft"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {post.status} • {post.time}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-center ${
                  post.status === "Draft"
                    ? "text-yellow-600 bg-yellow-100"
                    : "text-green-600 bg-green-100"
                }`}
              >
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="w-full lg:w-1/2 border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            Recent Applications
          </h2>
          <button className="text-blue-600 text-base font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {recentApplications.map((applicant, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={applicant.image}
                    alt={applicant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-800">
                    {applicant.name}
                  </p>
                  <p className="text-base text-gray-500">
                    {applicant.role} • {applicant.time}
                  </p>
                </div>
              </div>
              <button className="text-blue-600 text-base font-semibold hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* ------- Top Section ------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Total Blogs */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Total Blogs</h2>
            <h1 className="text-2xl font-bold">24</h1>
            <p className="text-green-600 text-sm font-medium">+3 this week</p>
          </div>
          {iconWrapper(
            <FaBlog className="text-3xl text-blue-600" />,
            "bg-blue-100"
          )}
        </div>

        {/* Job Openings */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">
              Job Openings
            </h2>
            <h1 className="text-2xl font-bold">8</h1>
            <p className="text-blue-600 text-sm font-medium">2 expiring soon</p>
          </div>
          {iconWrapper(
            <MdWork className="text-3xl text-green-600" />,
            "bg-green-100"
          )}
        </div>

        {/* Applications */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">
              Applications
            </h2>
            <h1 className="text-2xl font-bold">8</h1>
            <p className="text-red-600 text-sm font-medium">12 new today</p>
          </div>
          {iconWrapper(
            <FaUsers className="text-3xl text-red-600" />,
            "bg-red-100"
          )}
        </div>

        {/* Reviews */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Reviews</h2>
            <h1 className="text-2xl font-bold">56</h1>
            <p className="text-purple-600 text-sm font-medium">
              4.8 avg rating
            </p>
          </div>
          {iconWrapper(
            <FaStar className="text-3xl text-purple-500" />,
            "bg-purple-100"
          )}
        </div>
      </div>

      {/* ------- Middle Section ------- */}
      {MiddleSection()}
 
      {/* ------- Bottom Section ------- */}
      {bottomSection()}
    </div>
  );
};

export default Dashboard;