import React from 'react';

export default function AddNewUser() {
  return (
    <div className='bg-gray-100 p-15'>
        <div className='mb-10'>
            <h1 className="text-2xl font-semibold mb-1">Add New User</h1>
            <p className="text-sm text-gray-500">Create a new admin user account with specific roles and permissions.</p>
        </div>
    <div className="min-h-screen bg-white p-6 text-gray-800 border border-gray-200 rounded-lg shadow-md">
      <form className="space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border px-3 py-2 rounded w-full" placeholder="Enter first name" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="Enter last name" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="user@company.com" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="+1 (555) 123-4567" />
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <h2 className="text-lg font-medium mb-2">Profile Picture</h2>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload Photo</button>
              <button className="text-red-500">Remove</button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB. Recommended 400×400px.</p>
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border px-3 py-2 rounded w-full">
              <option>Select a role</option>
            </select>
            <select className="border px-3 py-2 rounded w-full">
              <option>Select department</option>
            </select>
            <input className="border px-3 py-2 rounded w-full" placeholder="e.g., Content Manager" />
            <select className="border px-3 py-2 rounded w-full">
              <option>Active</option>
            </select>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <h2 className="text-lg font-medium mb-4">Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Content Management</label>
              <div className="space-y-1">
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Blog Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Services Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Reviews Management</span></label>
              </div>
            </div>
            <div>
              <label className="block mb-2">Admin Functions</label>
              <div className="space-y-1">
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Career Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Contact Queries</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Newsletter Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>User Management</span></label>
              </div>
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <div>
          <h2 className="text-lg font-medium mb-4">Password Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="password" className="border px-3 py-2 rounded w-full" placeholder="Enter temporary password" required />
            <input type="password" className="border px-3 py-2 rounded w-full" placeholder="Confirm password" required />
          </div>
          <p className="text-xs text-gray-500 mt-1">User will be required to change on first login</p>
          <p className="text-xs text-gray-500">Send login credentials via email</p>
        </div>

        {/* Additional Settings */}
        <div>
          <h2 className="text-lg font-medium mb-4">Additional Settings</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Require two-factor authentication</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Send email notifications for important updates</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Allow API access</span>
          </label>
        </div>

        {/* Notes */}
        <h2 className="text-lg font-medium mb-4">Notes</h2>
        <label className="block mb-2">Internal Notes</label>
        <textarea className="border border-gray-350 px-3 py-2 rounded w-full h-24 text-gray-400" placeholder="Add any internal notes about this user..."></textarea>

        <div className="border-t pt-4 mt-6 flex flex-wrap justify-end gap-3 border-gray-200">
          <button type="button" className="border px-4 py-2 rounded text-gray-700">Save as Draft</button>
          <button type="button" className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700">
            <span>👤</span>
            <span>Create User</span>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
