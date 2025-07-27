export const transformBlogs = (rawBlogs) =>
  rawBlogs.map((blog, index) => ({
    id: blog._id,
    serial: index + 1,
    title: blog.title,
    desc: blog.metaDescription,
    category: blog.category,
    status: blog.status.charAt(0).toUpperCase() + blog.status.slice(1),
    date: new Date(blog.publishedDate || blog.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    ),
    author: `${blog.author?.name} `.trim() || "Unknown",
    img: blog.coverImage,
    authorImg:
      blog.author?.profilePicture ||
      "https://randomuser.me/api/portraits/lego/1.jpg",
  }));
