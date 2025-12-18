export const transformBlogs = (rawBlogs) => {
  if (!Array.isArray(rawBlogs)) return [];

  return rawBlogs.map((blog, index) => {
    let authorName = "Unknown Author";
    let authorImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default Avatar

    // CHECK 1: Does author exist? (If null, user might be deleted)
    if (blog.author) {
      
      // A. Handle Avatar
      if (blog.author.profilePicture) {
        authorImg = blog.author.profilePicture;
      }

      // B. Handle Name
      if (blog.author.name) {
        // Case 1: Admin (has 'name')
        authorName = blog.author.name;
      } 
      else if (blog.author.firstname) {
        // Case 2: Staff User (has 'firstname')
        authorName = `${blog.author.firstname} ${blog.author.lastname || ""}`;
      } 
      else if (blog.author.email) {
        // Case 3: Fallback to Email (if names are missing)
        authorName = blog.author.email.split('@')[0]; 
      }
    } else {
       // Case 4: Author was deleted from database
       authorName = "Deleted User";
    }

    return {
      id: blog._id,
      serial: index + 1,
      title: blog.title,
      desc: blog.metaDescription || blog.content?.substring(0, 100) + "..." || "",
      category: blog.category,
      
      status: blog.status 
        ? blog.status.charAt(0).toUpperCase() + blog.status.slice(1) 
        : "Draft",

      date: new Date(blog.publishedDate || blog.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),
      
      createdAt: blog.createdAt,
      
      // ✅ Use the robust name we calculated above
      author: authorName.trim(), 
      authorImg: authorImg,
      
      coverImage: blog.coverImage,
      img: blog.coverImage,
    };
  });
};