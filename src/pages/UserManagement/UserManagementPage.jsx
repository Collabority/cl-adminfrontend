import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Users,
  CheckCircle,
  Clock,
  Crown,
  Eye,
  Pencil,
  Trash,
  Plus,
  X,
  ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";
import instance from "../../lib/axios"; 

export default function UserManagementPage() {
  // --- STATE DEFINITIONS ---
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editUser, setEditUser] = useState(null); 
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    contentPermissions: [],
    adminPermission: []
  });

  // --- 1. FETCH & MAP DATA ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/users/all");
      
      const fetchedUsers = (response.data?.data || []).map(user => {
        // Calculate Permissions Count
        const permCount = (user.contentPermissions?.length || 0) + (user.adminPermission?.length || 0);
        
        return {
          id: user._id,
          // Store raw data for Edit Form & Logic
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          originalRole: user.role,
          originalStatus: user.status, 
          contentPermissions: user.contentPermissions || [],
          adminPermission: user.adminPermission || [],

          // Display Data
          avatar: user.profilePicture || `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          role: user.role, 
          status: user.status === 'active' ? 'Active' : 'Deactivated',
          lastLogin: new Date(user.updatedAt).toLocaleDateString(),
          permissionsCount: permCount, 
          roleColor: getRoleColor(user.role),
        };
      });

      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- 2. DYNAMIC STATS ---
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "Active").length;
    const deactivatedUsers = users.filter((u) => u.status === "Deactivated").length;
    const managers = users.filter((u) => u.role.includes("Manager") || u.role === "Admin").length;

    return { totalUsers, activeUsers, deactivatedUsers, managers };
  }, [users]);

  // --- 3. FILTER LOGIC ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    
    // Exact match against the Capitalized status string ("Active" or "Deactivated")
    const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // --- HELPERS ---
  const getRoleColor = (role) => {
    if (role === "Content Manager") return "blue";
    if (role === "Blog Manager") return "purple";
    if (role === "Services Manager") return "yellow";
    if (role === "Newsletter Manager") return "green";
    return "gray";
  };

  // --- HANDLERS ---

  // Handle Status Toggle (Direct Table Update)
  const handleStatusChange = async (userId, newStatus) => {
    try {
      // 1. Optimistic Update
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { 
                ...u, 
                originalStatus: newStatus, // 'active' or 'deactivated'
                status: newStatus === 'active' ? 'Active' : 'Deactivated',
                statusColor: newStatus === 'active' ? 'green' : 'gray' 
              }
            : u
        )
      );

      // 2. API Call
      await instance.put(`/users/update/${userId}`, { status: newStatus });
      console.log(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status. Reverting...");
      fetchUsers();
    }
  };

  // Handle Delete
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await instance.delete(`/users/delete/${userId}`);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user");
      }
    }
  };

  // Handle View
  const handleView = (user) => { 
    alert(
      `User Details:\n
      Name: ${user.name}
      Email: ${user.email}
      Role: ${user.role}
      Status: ${user.status}
      Phone: ${user.phone || "N/A"}
      Permissions Count: ${user.permissionsCount}`
    ); 
  };

  // --- EDIT MODAL HANDLERS ---
  
  // Populate form when Edit button is clicked
  const handleEdit = (user) => {
    setEditUser(user.id);
    setEditForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone || "",
      role: user.originalRole,
      status: user.originalStatus,
      contentPermissions: user.contentPermissions,
      adminPermission: user.adminPermission
    });
  };

  // Handle Input Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle Permission Checkboxes
  const handlePermissionChange = (e, type) => {
    const { name, checked } = e.target;
    setEditForm(prev => {
      const listName = type === "content" ? "contentPermissions" : "adminPermission";
      const currentList = prev[listName];
      let newList;
      
      if (checked) {
        newList = [...currentList, name];
      } else {
        newList = currentList.filter(p => p !== name);
      }
      
      return { ...prev, [listName]: newList };
    });
  };

  // Save Changes
  const handleEditSave = async () => {
    try {
      await instance.put(`/users/update/${editUser}`, editForm);
      alert("User updated successfully!");
      setEditUser(null);
      fetchUsers(); 
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">User Management</h1>
          <p className="text-base text-gray-500 mb-6">Manage system access and permissions.</p>
        </div>
        <Link to="/users/create">
          <button className="mb-4 text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 p-3">
            <span className="text-base flex items-center"><Plus className="mr-2" />Add New User</span>
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard icon={<Users className="text-gray-600 w-6 h-6" />} title="Total Users" value={loading ? "..." : stats.totalUsers} />
        <SummaryCard icon={<CheckCircle className="text-green-500 w-6 h-6" />} title="Active Users" value={loading ? "..." : stats.activeUsers} />
        <SummaryCard icon={<Clock className="text-red-500 w-6 h-6" />} title="Deactivated" value={loading ? "..." : stats.deactivatedUsers} />
        <SummaryCard icon={<Crown className="text-purple-500 w-6 h-6" />} title="Managers" value={loading ? "..." : stats.managers} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 items-stretch sm:items-center mt-4">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-full text-gray-700"
          />
        </div>
        
        {/* Role Filter */}
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border px-3 py-2 rounded-lg w-full sm:w-auto text-sm">
          <option value="All Roles">All Roles</option>
          <option value="Content Manager">Content Manager</option>
          <option value="Blog Manager">Blog Manager</option>
          <option value="Services Manager">Services Manager</option>
          <option value="Newsletter Manager">Newsletter Manager</option>
        </select>
        
        {/* Status Filter */}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-lg w-full sm:w-auto text-sm">
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          {/* Matches the 'Deactivated' string used in the table */}
          <option value="Deactivated">Deactivated</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-3">User</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 hidden md:table-cell">Last Login</th> 
              <th className="p-3 hidden lg:table-cell">Permissions</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center space-x-2">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${user.roleColor}-100 text-${user.roleColor}-600 whitespace-nowrap`}>
                    {user.role}
                  </span>
                </td>
                
                {/* --- Interactive Status Toggle --- */}
                <td className="p-3">
                  <select
                    value={user.originalStatus} // Use lowercase 'active'/'deactivated'
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none cursor-pointer border-none ${
                      user.originalStatus === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </td>

                <td className="p-3 hidden md:table-cell text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{user.permissionsCount} Access Rights</span>
                  </div>
                </td>
                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button onClick={() => handleView(user)} className="text-green-600 p-1 rounded hover:bg-green-50" title="View"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => handleEdit(user)} className="text-blue-500 p-1 rounded hover:bg-blue-50" title="Edit"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 p-1 rounded hover:bg-red-50" title="Delete"><Trash className="w-4 h-4" /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="p-6 text-center text-gray-500">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- DETAILED EDIT MODAL --- */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Edit User Details</h2>
              <button onClick={() => setEditUser(null)}><X className="text-gray-500 hover:text-gray-700" /></button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">First Name</label><input name="firstname" value={editForm.firstname} onChange={handleEditChange} className="w-full border rounded px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Last Name</label><input name="lastname" value={editForm.lastname} onChange={handleEditChange} className="w-full border rounded px-3 py-2" /></div>
              </div>
              
              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Email</label><input name="email" value={editForm.email} disabled className="w-full border rounded px-3 py-2 bg-gray-100" /></div>
                <div><label className="block text-sm font-medium mb-1">Phone</label><input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full border rounded px-3 py-2" /></div>
              </div>
              
              {/* Role & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select name="role" value={editForm.role} onChange={handleEditChange} className="w-full border rounded px-3 py-2">
                    <option value="Content Manager">Content Manager</option>
                    <option value="Blog Manager">Blog Manager</option>
                    <option value="Services Manager">Services Manager</option>
                    <option value="Newsletter Manager">Newsletter Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full border rounded px-3 py-2">
                    <option value="active">Active</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Permissions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Content Checkboxes */}
                  <div>
                    <h4 className="text-sm font-semibold text-blue-600 mb-2">Content Access</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2"><input type="checkbox" name="blogmgmt" checked={editForm.contentPermissions.includes("blogmgmt")} onChange={(e) => handlePermissionChange(e, "content")} /><span className="text-sm">Blog Management</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" name="servicesmgmt" checked={editForm.contentPermissions.includes("servicesmgmt")} onChange={(e) => handlePermissionChange(e, "content")} /><span className="text-sm">Services Management</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" name="reviewmgmt" checked={editForm.contentPermissions.includes("reviewmgmt")} onChange={(e) => handlePermissionChange(e, "content")} /><span className="text-sm">Reviews Management</span></label>
                    </div>
                  </div>
                  {/* Admin Checkboxes */}
                  <div>
                    <h4 className="text-sm font-semibold text-purple-600 mb-2">Admin Access</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2"><input type="checkbox" name="careermgmt" checked={editForm.adminPermission.includes("careermgmt")} onChange={(e) => handlePermissionChange(e, "admin")} /><span className="text-sm">Career Management</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" name="newslettermgmt" checked={editForm.adminPermission.includes("newslettermgmt")} onChange={(e) => handlePermissionChange(e, "admin")} /><span className="text-sm">Newsletter Management</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" name="usermgmt" checked={editForm.adminPermission.includes("usermgmt")} onChange={(e) => handlePermissionChange(e, "admin")} /><span className="text-sm">User Management</span></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <button onClick={() => setEditUser(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">Cancel</button>
              <button onClick={handleEditSave} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-base font-medium text-gray-500">{title}</h4>
        {icon}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}