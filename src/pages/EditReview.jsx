import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import instance from "../lib/axios";

const EditReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { review } = location.state || {};

  // -----------------------------------------
  // 1. STATE MANAGEMENT
  // -----------------------------------------
  const [name, setName] = useState("");
  const [title, setTitle] = useState(""); 
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("Draft");
  const [category, setCategory] = useState(""); 

  // UI States
  const [hover, setHover] = useState(0);
  const [existingProfile, setExistingProfile] = useState(null); 
  const [profilePic, setProfilePic] = useState(null); 
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // 2. POPULATE DATA ON LOAD
  // -----------------------------------------
  useEffect(() => {
    if (review) {
      setName(review.name || "");
      setTitle(review.designation || review.title || "");
      setCompany(review.company || review.companyName || "");
      setEmail(review.email || "");

      setReviewTitle(review.reviewTitle || "");
      setReviewContent(review.review || review.reviewContent || "");
      setRating(review.rating || 0);
      setStatus(review.status || "Draft");
      setCategory(review.category || ""); 

      setExistingProfile(review.profilePicture || null);
    } else {
      navigate(-1);
    }
  }, [review, navigate]);

  // -----------------------------------------
  // 3. SAVE / UPDATE LOGIC
  // -----------------------------------------
  const handleSaveReview = async (overrideStatus) => {
    const finalStatus = overrideStatus || status;

    // Validation
    if (
      !name.trim() ||
      !title.trim() ||
      !company.trim() ||
      !reviewContent.trim() ||
      !category.trim() ||
      rating === 0
    ) {
      alert(
        "Please fill in all required fields (Name, Designation, Company, Content, Category, Rating)."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Append Text Fields
      formData.append("name", name);
      formData.append("email", email);
      formData.append("designation", title); 
      formData.append("company", company); 
      formData.append("reviewTitle", reviewTitle);
      formData.append("reviewContent", reviewContent);
      formData.append("rating", rating);
      formData.append("category", category);
      formData.append("status", finalStatus);

      // Append File ONLY if user selected a new one
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const reviewId = review._id || review.id;

      // Make API Call
      await instance.put(`/reviews/update/${reviewId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        `Review ${
          finalStatus === "Published" ? "Published" : "Updated"
        } successfully!`
      );
      navigate(-1); 
    } catch (error) {
      console.error("Error updating review:", error);
      const msg = error.response?.data?.message || "Error updating review";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // 4. IMAGE HANDLERS
  // -----------------------------------------
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (file.size > maxSize) {
      alert("File size should be less than 1MB.");
      return;
    }
    setProfilePic(file);
  };

  if (!review) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* -----------------------------------------
          HEADER SECTION
      ----------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Reviews &amp; Testimonials</span>
          <svg
            className="mx-2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-black font-bold">Edit Review</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 rounded-lg px-4 sm:px-5 py-2 text-gray-700 font-semibold bg-white shadow-sm hover:bg-gray-50 transition text-base w-full sm:w-auto"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSaveReview("Published")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 sm:px-5 py-2 font-bold transition text-base shadow-sm flex items-center gap-2"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            {loading ? "Saving..." : "Publish Review"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">
          Edit Review &amp; Testimonial
        </h1>
        <p className="text-base text-gray-500 mb-6">
          Edit customer review or testimonial to showcase on your website.
        </p>

        {/* -----------------------------------------
            BASIC INFORMATION
        ----------------------------------------- */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Reviewer Name *
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                placeholder="Enter reviewer's full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Designation/Title *
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                placeholder="e.g., CEO, Marketing Director"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Company/Organization *
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Email *
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                placeholder="reviewer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* -----------------------------------------
            PROFILE PICTURE
        ----------------------------------------- */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-2 ">
            <h1 className="text-2xl font-semibold text-black">
              Profile Picture
            </h1>
            <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-300 hover:border-blue-600 transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
              {/* Show either New Upload Preview OR Existing Backend Image OR Default Icon */}
              {profilePic || existingProfile ? (
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : existingProfile
                  }
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FaCloudUploadAlt className="text-5xl text-gray-400" />
              )}

              <h2 className="text-black text-2xl font-semibold">
                {existingProfile ? "Change Profile Picture" : "Upload Profile Picture"}
              </h2>

              <input
                name="profilePic"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleProfilePicChange}
              />

              <button
                type="button"
                onClick={handleProfilePicClick}
                className="w-full sm:w-auto max-w-xs sm:max-w-none bg-blue-600 px-4 py-2 sm:px-6 sm:py-2 text-white text-base font-semibold rounded-xl cursor-pointer hover:bg-blue-700 transition duration-200"
              >
                {existingProfile ? "Change file" : "Choose file"}
              </button>

              <p className="font-semibold text-base text-gray-500 mt-2">
                Recommended size: 400x400px, Max file size: 1MB
              </p>
            </div>
          </div>
        </div>

        {/* -----------------------------------------
            RATING & REVIEW CONTENT
        ----------------------------------------- */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">
            Rating &amp; Review Content
          </h2>
          <div className="mb-4">
            <label className="block text-base text-gray-700 mb-1">
              Rating *
            </label>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl ${
                    star <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`Rate ${star}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-gray-400 text-base">
                Click to rate
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-base text-gray-700 mb-1">
              Review Title
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              placeholder="Brief title for the review"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base text-gray-700 mb-1">
              Review Content
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm min-h-[100px]"
              placeholder="Write the detailed review or testimonial content..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <div className="text-xs text-gray-400 mt-1">
              Minimum 50 characters recommended
            </div>
          </div>
        </div>

        {/* -----------------------------------------
            ADDITIONAL SETTINGS
        ----------------------------------------- */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-4">Additional Settings</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Category Field */}
            <label className="text-base font-medium">Category: *</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="product">Product Review</option>
              <option value="service">Service Review</option>
              <option value="testimonial">Testimonial</option>
            </select>

            {/* Status Field */}
            <label className="text-base font-medium">Status:</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Pending</option>
            </select>

            <button
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-bold transition text-base shadow-sm w-full sm:w-auto"
              onClick={() => handleSaveReview()}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview; 