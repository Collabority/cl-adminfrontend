import React, { useState, useEffect } from "react";
import { FaBlog, FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import instance from "../lib/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State for Lists
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentApps, setRecentApps] = useState([]); // ✅ New State for Apps
  
  // State for Calculated Stats
  const [stats, setStats] = useState({
    totalBlogs: 0,
    blogsThisWeek: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalReviews: 0,
    avgRating: 0,
    totalApps: 0,        // ✅ New
    newAppsToday: 0,     // ✅ New
    latestActivity: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Fetch data from all endpoints (Included Applications)
        const [blogsRes, jobsRes, reviewsRes, appsRes] = await Promise.allSettled([
          instance.get("/blogs/all?limit=100"), 
          instance.get("/career/get-jobs?limit=100"), 
          instance.get("/reviews/getAll?limit=100"),
          instance.get("/career/applications") // ✅ Fetch Real Applications
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
           activeJobs = rawJobs.filter(j => j.status === 'Active').length; 
        }

        // --- PROCESS APPLICATIONS (✅ NEW) ---
        let appData = [];
        let newAppsCount = 0;
        if (appsRes.status === "fulfilled") {
            const rawApps = appsRes.value.data?.data || []; // Assuming standard structure
            if(Array.isArray(rawApps)) {
                appData = rawApps;
                // Calculate "New Today" (or just status 'New')
                const todayStr = new Date().toISOString().split('T')[0];
                newAppsCount = appData.filter(app => 
                    app.status === 'New' || 
                    (app.appliedDate && app.appliedDate.startsWith(todayStr))
                ).length;
            }
        }

        // --- PROCESS REVIEWS ---
        let reviewCount = 0;
        let average = 0;
        if (reviewsRes.status === "fulfilled") {
           const rawReviews = reviewsRes.value.data?.data?.reviews || reviewsRes.value.data?.reviews || [];
           if (Array.isArray(rawReviews)) {
             reviewCount = rawReviews.length;
             if (reviewCount > 0) {
               const sum = rawReviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0);
               average = (sum / reviewCount).toFixed(1);
             }
           }
        }

        // --- UPDATE STATE ---
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newBlogsCount = blogData.filter(b => new Date(b.createdAt) > oneWeekAgo).length;

        // Sort applications by date (newest first) and take top 3
        const sortedApps = [...appData].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        
        setRecentBlogs(blogData.slice(0, 3));
        setRecentApps(sortedApps.slice(0, 3)); // ✅ Set Recent Apps

        setStats({
          totalBlogs: blogData.length,
          blogsThisWeek: newBlogsCount,
          totalJobs: jobCount,
          activeJobs: activeJobs,
          totalReviews: reviewCount,    
          avgRating: average,
          totalApps: appData.length,  // ✅ Set Total
          newAppsToday: newAppsCount, // ✅ Set New Count
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

  const cardStyle = "flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white";
  const quickActionsCardStyle = "border border-gray-200 shadow-sm rounded-xl p-4 bg-white hover:bg-blue-100 cursor-pointer transition-colors duration-200";
  const iconWrapper = (icon, bgColor) => <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>;

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

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* ------- Top Section ------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Total Blogs */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Total Blogs</h2>
            <h1 className="text-2xl font-bold">{loading ? "..." : stats.totalBlogs}</h1>
            <p className="text-green-600 text-sm font-medium">+{stats.blogsThisWeek} this week</p>
          </div>
          {iconWrapper(<FaBlog className="text-3xl text-blue-600" />, "bg-blue-100")}
        </div>

        {/* Job Openings */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Job Openings</h2>
            <h1 className="text-2xl font-bold">{loading ? "..." : stats.totalJobs}</h1>
            <p className="text-blue-600 text-sm font-medium">{stats.activeJobs} active</p>
          </div>
          {iconWrapper(<MdWork className="text-3xl text-green-600" />, "bg-green-100")}
        </div>

        {/* Applications - ✅ DYNAMIC */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Applications</h2>
            <h1 className="text-2xl font-bold">{loading ? "..." : stats.totalApps}</h1>
            <p className="text-red-600 text-sm font-medium">{stats.newAppsToday} new / pending</p>
          </div>
          {iconWrapper(<FaUsers className="text-3xl text-red-600" />, "bg-red-100")}
        </div>

        {/* Reviews */}
        <div className={cardStyle}>
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Reviews</h2>
            <h1 className="text-2xl font-bold">{loading ? "..." : stats.totalReviews}</h1>
            <p className="text-purple-600 text-sm font-medium">{stats.avgRating} avg rating</p>
          </div>
          {iconWrapper(<FaStar className="text-3xl text-purple-500" />, "bg-purple-100")}
        </div>
      </div>

      {/* ------- Middle Section (Quick Actions & Activity) ------- */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Quick Actions (70%) */}
        <div className="w-full lg:w-[70%] border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={quickActionsCardStyle} onClick={() => navigate("/blog/create-blog-post")}>
              {quickActionsCard("text-blue-600", "bg-blue-100", "Create Blog Post", "Write new article")}
            </div>
            <div className={quickActionsCardStyle} onClick={() => navigate("/careers/create")}>
              {quickActionsCard("text-green-600", "bg-green-100", "Add Job Opening", "Post new position")}
            </div>
            <div className={quickActionsCardStyle} onClick={() => navigate("/services/create")}>
              {quickActionsCard("text-purple-600", "bg-purple-100", "Add Service", "Create new service")}
            </div>
            <div className={quickActionsCardStyle} onClick={() => navigate("/reviews/add")}>
              {quickActionsCard("text-yellow-600", "bg-yellow-100", "Add Review", "Create testimonial")}
            </div>
          </div>
        </div>

        {/* Recent Activity (30%) */}
        <div className="w-full lg:w-[30%] border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h2>
          {stats.latestActivity ? (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 flex justify-center items-center h-12 w-12 shrink-0">
                <FaBlog className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 line-clamp-1">New post published</p>
                <p className="text-xs font-semibold text-gray-500 line-clamp-1">"{stats.latestActivity.title}"</p>
                <span className="text-xs text-gray-400">{getTimeAgo(stats.latestActivity.createdAt)}</span>
              </div>
            </div>
          ) : (
             <p className="text-sm text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>

      {/* ------- Bottom Section ------- */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        
        {/* Recent Blog Posts */}
        <div className="w-full lg:w-1/2 border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Recent Blog Posts</h2>
            <Link to="/blog" className="text-blue-600 text-base font-semibold hover:underline">View All</Link>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? <p>Loading...</p> : recentBlogs.map((post, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <div className="flex gap-3 items-start sm:items-center w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                    <img src={post.coverImage || "https://via.placeholder.com/150"} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{post.title}</h3>
                    <p className="text-xs font-semibold text-gray-500">
                      {["Draft", "draft"].includes(post.status || post.publishStatus) ? 
                          <span className="text-yellow-600">Draft</span> : <span className="text-green-600">Published</span>}
                      <span className="text-gray-400"> • {getTimeAgo(post.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {!loading && recentBlogs.length === 0 && <p className="text-gray-500 text-sm">No blogs found.</p>}
          </div>
        </div>

        {/* Recent Applications - ✅ DYNAMIC */}
        <div className="w-full lg:w-1/2 border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Recent Applications</h2>
            <Link to="/careers/applications" className="text-blue-600 text-base font-semibold hover:underline">View All</Link>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? <p>Loading...</p> : recentApps.map((applicant, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={applicant.avatar || "https://res.cloudinary.com/dxo7rbhrl/image/upload/v1756140314/UnknownPerson_ybjokv.jpg"} 
                      alt={applicant.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-800">{applicant.name}</p>
                    <p className="text-sm text-gray-500">
                       {applicant.position} • {getTimeAgo(applicant.appliedDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <span className={`text-xs px-2 py-1 rounded-full ${
                      applicant.status === 'New' ? 'bg-green-100 text-green-800' : 
                      applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                   }`}>
                      {applicant.status}
                   </span>
                </div>
              </div>
            ))}
            {!loading && recentApps.length === 0 && <p className="text-gray-500 text-sm">No recent applications.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

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