import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios"; 

export default function AddNewUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Form Data State
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    password: "",
    confirmPassword: "",
    twoFactorAuthentication: false,
    emailsAndNotification: true,
    apiAccess: false,
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  // 2. Permission States
  const [contentPerms, setContentPerms] = useState({
    blogmgmt: false,
    reviewmgmt: false,
    servicesmgmt: false,
  });

  const [adminPerms, setAdminPerms] = useState({
    careermgmt: false,
    contactmgmt: false,
    newslettermgmt: false,
    usermgmt: false,
  });

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePermChange = (e, type) => {
    const { name, checked } = e.target;
    if (type === "content") {
      setContentPerms((prev) => ({ ...prev, [name]: checked }));
    } else {
      setAdminPerms((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      // Append basic fields
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") {
          data.append(key, formData[key]);
        }
      });

      // Append File
      if (profilePic) {
        data.append("profilePicture", profilePic);
      }

      // Append Permissions: Filter TRUE values -> Get Keys -> JSON Stringify
      const selectedContent = Object.keys(contentPerms).filter((k) => contentPerms[k]);
      const selectedAdmin = Object.keys(adminPerms).filter((k) => adminPerms[k]);

      data.append("contentPermissions", JSON.stringify(selectedContent));
      data.append("adminPermission", JSON.stringify(selectedAdmin));

      // API Call
      const response = await instance.post("/users/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("User created:", response.data);
      alert("User Created Successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-15'>
      <div className='mb-6 sm:mb-8 md:mb-10'>
        <h1 className="text-2xl font-semibold mb-1">Add New User</h1>
        <p className="text-base text-gray-500">Create a new admin user account with specific roles and permissions.</p>
      </div>
      
      <div className="min-h-screen bg-white p-4 sm:p-6 text-gray-800 border border-gray-200 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstname" value={formData.firstname} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="First Name" required />
              <input name="lastname" value={formData.lastname} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="Last Name" required />
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="user@company.com" required />
              <input name="phone" value={formData.phone} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="+1 (555) 123-4567" />
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <h2 className="text-lg font-medium mb-2">Profile Picture</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
              )}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
                <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto cursor-pointer text-center">
                  Upload Photo
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </label>
                {preview && <button type="button" onClick={() => { setProfilePic(null); setPreview(null); }} className="text-red-500 w-full sm:w-auto">Remove</button>}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="role" value={formData.role} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" required>
                <option value="">Select a role</option>
                <option value="Content Manager">Content Manager</option>
                <option value="Blog Manager">Blog Manager</option>
                <option value="Services Manager">Services Manager</option>
                <option value="Newsletter Manager">Newsletter Manager</option>
              </select>
              
              <select name="status" value={formData.status} onChange={handleInputChange} className="border px-3 py-2 rounded w-full">
                <option value="active">Active</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h2 className="text-lg font-medium mb-4">Permissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-base font-medium">Content Management</label>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2"><input type="checkbox" name="blogmgmt" checked={contentPerms.blogmgmt} onChange={(e) => handlePermChange(e, 'content')} /> <span>Blog Management</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" name="servicesmgmt" checked={contentPerms.servicesmgmt} onChange={(e) => handlePermChange(e, 'content')} /> <span>Services Management</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" name="reviewmgmt" checked={contentPerms.reviewmgmt} onChange={(e) => handlePermChange(e, 'content')} /> <span>Reviews Management</span></label>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-base font-medium">Admin Functions</label>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2"><input type="checkbox" name="careermgmt" checked={adminPerms.careermgmt} onChange={(e) => handlePermChange(e, 'admin')} /> <span>Career Management</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" name="contactmgmt" checked={adminPerms.contactmgmt} onChange={(e) => handlePermChange(e, 'admin')} /> <span>Contact Queries</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" name="newslettermgmt" checked={adminPerms.newslettermgmt} onChange={(e) => handlePermChange(e, 'admin')} /> <span>Newsletter Management</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" name="usermgmt" checked={adminPerms.usermgmt} onChange={(e) => handlePermChange(e, 'admin')} /> <span>User Management</span></label>
                </div>
              </div>
            </div>
          </div>

          {/* Password Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">Password Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="Enter password" required />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="Confirm password" required />
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">Additional Settings</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="twoFactorAuthentication" checked={formData.twoFactorAuthentication} onChange={handleInputChange} />
                <span>Require two-factor authentication</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="emailsAndNotification" checked={formData.emailsAndNotification} onChange={handleInputChange} />
                <span>Send email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="apiAccess" checked={formData.apiAccess} onChange={handleInputChange} />
                <span>Allow API access</span>
              </label>
            </div>
          </div>

          <div className="border-t pt-4 mt-6 flex flex-col sm:flex-row justify-end gap-3 border-gray-200">
            <button type="button" onClick={() => navigate("/users/roles")} className="border border-blue-600 text-blue-600 px-4 py-2 rounded w-full sm:w-auto">Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center sm:justify-start space-x-2 hover:bg-blue-700 w-full sm:w-auto disabled:bg-blue-400">
              <span>👤</span>
              <span>{loading ? "Creating..." : "Create User"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}