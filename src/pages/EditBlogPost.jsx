import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import BasicInfoSection from "../components/BasicInfoSection";
import CreateBlogContent from "../components/CreateBlogContent";
import SEOSettingsSection from "../components/SEOSettingsSection";
import PublishingOptionsSection from "../components/PublishingOptionsSection";

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

const EditBlogPost = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(null); 

  useEffect(() => {
    const blogId = parseInt(id);
    const post = blogPosts.find((post) => post.id === blogId);

    if (post) {
      // Map blog post to formData
      setFormData({
        title: post.title || "",
        slug: post.title?.toLowerCase().replace(/\s+/g, "-") || "",
        author: post.author || "Admin",
        category: post.category || "",
        tags: [], // default if none
        metaTitle: post.title || "",
        metaDescription: post.desc || "",
        focusKeyword: "",
        status: post.status?.toLowerCase() || "draft",
        publishDate: post.date !== "Draft" ? post.date : "",
        featured: false,
        allowComments: true,
        coverImage: post.img || null,
        content: post.desc || "",
      });
    }
  }, [id]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e, status = "draft") => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, key === "tags" ? JSON.stringify(value) : value);
    });

    data.set("status", status);
    console.log("Submitting edited blog with data:", Object.fromEntries(data));
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
      <h1 className="text-xl font-semibold text-black">Cover Image</h1>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-blue-600 transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-black text-xl sm:text-2xl font-semibold">
          Upload Cover Image
        </h2>
        <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
          Click to browse Choose File
        </h3>
        <input
          name="coverImage"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
              alert("Please select a valid image file.");
              return;
            }

            if (file.size > 5 * 1024 * 1024) {
              alert("File size should be less than 5MB.");
              return;
            }

            setFormData((prevData) => ({
              ...prevData,
              coverImage: file,
            }));
          }}
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full sm:w-auto max-w-xs sm:max-w-none bg-blue-600 px-4 py-2 sm:px-6 sm:py-2 text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          Choose file
        </button>

        <p className="font-semibold text-[13px] text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>

        {formData?.coverImage && (
          <img
            src={
              typeof formData.coverImage === "string"
                ? formData.coverImage
                : URL.createObjectURL(formData.coverImage)
            }
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  if (!formData) return <p className="p-4">Loading blog data...</p>;

  return (
    <form className="flex flex-col gap-6 p-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-sm">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Blog Post</span>
        </h3>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold">Edit Blog Post</h1>
      <p className="text-gray-600 font-semibold text-sm md:text-lg">
        Update the details below to edit and publish your blog post.
      </p>

      {/* Form Sections */}
      <BasicInfoSection formData={formData} setFormData={setFormData} />
      {coverImage()}
      <CreateBlogContent formData={formData} setFormData={setFormData} />
      <SEOSettingsSection formData={formData} setFormData={setFormData} />
      <PublishingOptionsSection formData={formData} setFormData={setFormData} />

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-sm text-gray-600 sm:text-base"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-blue-600 font-semibold text-white text-sm sm:text-base hover:bg-blue-700"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Post
        </button>
      </div>
    </form>
  );
};

export default EditBlogPost;
