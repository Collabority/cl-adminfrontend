import React, { useState, useEffect } from "react";
import { FaBlog, FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import instance from "../lib/axios";

// Hardcoded for now as we don't have an endpoint for applications provided yet
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State for Lists
  const [recentBlogs, setRecentBlogs] = useState([]);
  
  // State for Calculated Stats
  const [stats, setStats] = useState({
    totalBlogs: 0,
    blogsThisWeek: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalReviews: 0,
    avgRating: 0,
    latestActivity: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        //console.log("Fetching dashboard data...");

        // 1. Fetch data from all endpoints
        const [blogsRes, jobsRes, reviewsRes] = await Promise.allSettled([
          instance.get("/blogs/all?limit=100"), 
          instance.get("/career/get-jobs?limit=100"), 
          instance.get("/reviews/getAll?limit=100")
        ]);

        // --- PROCESS BLOGS ---
        let blogData = [];
        if (blogsRes.status === "fulfilled") {
           blogData = blogsRes.value.data?.data?.blogs || blogsRes.value.data?.blogs || [];
        }

        // --- PROCESS JOBS ---
        let jobCount = 0;
        let activeJobs = 0;
        if (jobsRes.status === "fulfilled") {
           const rawJobs = jobsRes.value.data?.data?.jobs || jobsRes.value.data?.jobs || [];
           jobCount = rawJobs.length;
           activeJobs = rawJobs.filter(j => j.status !== 'Closed').length; 
        }

        // --- PROCESS REVIEWS
        let reviewCount = 0;
        let average = 0;
        
        if (reviewsRes.status === "fulfilled") {
           //console.log("Reviews API Response:", reviewsRes.value.data);

           // Try to find the array of reviews
           const rawReviews = 
              reviewsRes.value.data?.data?.reviews || 
              reviewsRes.value.data?.reviews || 
              reviewsRes.value.data || 
              [];
           
           if (Array.isArray(rawReviews)) {
             reviewCount = rawReviews.length;
             
             if (reviewCount > 0) {
               // Calculate Average (Force conversion to Number to avoid string math errors)
               const sum = rawReviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
               average = (sum / reviewCount).toFixed(1);
             }
           }
        } else {
           console.error("Reviews fetch failed:", reviewsRes.reason);
        }

        // --- UPDATE STATE ---
        // Calculate new blogs this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newBlogsCount = blogData.filter(b => new Date(b.createdAt) > oneWeekAgo).length;

        setRecentBlogs(blogData.slice(0, 3));
        
        setStats({
          totalBlogs: blogData.length,
          blogsThisWeek: newBlogsCount,
          totalJobs: jobCount,
          activeJobs: activeJobs || jobCount,
          totalReviews: reviewCount,    
          avgRating: average,           
          latestActivity: blogData[0] || null 
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cardStyle =
    "flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white";

  const quickActionsCardStyle =
    "border border-gray-200 shadow-sm rounded-xl p-4 bg-white hover:bg-blue-100 cursor-pointer transition-colors duration-200";

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
            onClick={() => navigate("/reviews/add")} // Adjusted path guess
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

        {/* Dynamic Activity Item */}
        {stats.latestActivity ? (
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 flex justify-center items-center h-12 w-12 shrink-0">
              <FaBlog className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 line-clamp-1">
                New post published
              </p>
              <p className="text-xs font-semibold text-gray-500 line-clamp-1">
                "{stats.latestActivity.title}"
              </p>
              <span className="text-xs text-gray-400">
                 {getTimeAgo(stats.latestActivity.createdAt)}
              </span>
            </div>
          </div>
        ) : (
           <p className="text-sm text-gray-500">No recent activity.</p>
        )}
      </div>
    </div>
  );

  const BottomSection = () => (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Recent Blog Posts */}
      <div className="w-full lg:w-1/2 border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Recent Blog Posts</h2>
          <Link
            to="/blog"
            className="text-blue-600 text-base font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {loading ? <p>Loading...</p> : recentBlogs.map((post, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 last:border-0 pb-2 last:pb-0"
            >
              <div className="flex gap-3 items-start sm:items-center w-full sm:w-auto">
                <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={post.coverImage || "https://via.placeholder.com/150"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500">
                    {/* Handle casing for status */}
                    {(post.status || post.publishStatus) === "Draft" || (post.status || post.publishStatus) === "draft" ? (
                        <span className="text-yellow-600">Draft</span>
                    ) : (
                        <span className="text-green-600">Published</span>
                    )}
                    <span className="text-gray-400"> • {getTimeAgo(post.createdAt)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {!loading && recentBlogs.length === 0 && <p className="text-gray-500 text-sm">No blogs found.</p>}
        </div>
      </div>

      {/* Recent Applications (Still Static as requested/no endpoint) */}
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
            <h2 className="text-base text-gray-600 font-semibold">
              Total Blogs
            </h2>
            <h1 className="text-2xl font-bold">
              {loading ? "..." : stats.totalBlogs}
            </h1>
            <p className="text-green-600 text-sm font-medium">
              +{stats.blogsThisWeek} this week
            </p>
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
            <h1 className="text-2xl font-bold">
              {loading ? "..." : stats.totalJobs}
            </h1>
            <p className="text-blue-600 text-sm font-medium">
              {stats.activeJobs} active
            </p>
          </div>
          {iconWrapper(
            <MdWork className="text-3xl text-green-600" />,
            "bg-green-100"
          )}
        </div>

        {/* Applications - Static for now */}
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
            <h1 className="text-2xl font-bold">
              {loading ? "..." : stats.totalReviews}
            </h1>
            <p className="text-purple-600 text-sm font-medium">
              {stats.avgRating} avg rating
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
      {BottomSection()}
    </div>
  );
};

export default Dashboard;

// Helper function to show "time ago"
function getTimeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  return "Just now";
}