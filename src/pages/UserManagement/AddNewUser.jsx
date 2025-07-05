import React from 'react';

export default function AddNewUser() {
  return (
    <div className='bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-15'> {/* Added responsive padding */}
        <div className='mb-6 sm:mb-8 md:mb-10'> {/* Adjusted responsive margin-bottom */}
            <h1 className="text-xl sm:text-2xl font-semibold mb-1">Add New User</h1> {/* Responsive font size */}
            <p className="text-sm text-gray-500">Create a new admin user account with specific roles and permissions.</p>
        </div>
    <div className="min-h-screen bg-white p-4 sm:p-6 text-gray-800 border border-gray-200 rounded-lg shadow-md"> {/* Adjusted responsive padding */}
      <form className="space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Already responsive, good! */}
            <input className="border px-3 py-2 rounded w-full" placeholder="Enter first name" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="Enter last name" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="user@company.com" required />
            <input className="border px-3 py-2 rounded w-full" placeholder="+1 (555) 123-4567" />
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <h2 className="text-lg font-medium mb-2">Profile Picture</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"> {/* Stack vertically on small, row on medium+ */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div> {/* flex-shrink-0 to prevent shrinking */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0"> {/* Stack buttons vertically on small, row on medium+ */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">Upload Photo</button> {/* Full width on small, auto on medium+ */}
              <button className="text-red-500 w-full sm:w-auto">Remove</button> {/* Full width on small, auto on medium+ */}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">JPG, PNG up to 2MB. Recommended 400×400px.</p> {/* Center text on small, left on medium+ */}
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Already responsive */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Already responsive */}
            <div>
              <label className="block mb-2 font-medium">Content Management</label> {/* Added font-medium for consistency */}
              <div className="space-y-1">
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Blog Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Services Management</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Reviews Management</span></label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Admin Functions</label> {/* Added font-medium for consistency */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Already responsive */}
            <input type="password" className="border px-3 py-2 rounded w-full" placeholder="Enter temporary password" required />
            <input type="password" className="border px-3 py-2 rounded w-full" placeholder="Confirm password" required />
          </div>
          <p className="text-xs text-gray-500 mt-1">User will be required to change on first login</p>
          <p className="text-xs text-gray-500">Send login credentials via email</p>
        </div>

        {/* Additional Settings */}
        <div>
          <h2 className="text-lg font-medium mb-4">Additional Settings</h2>
          <div className="space-y-2"> {/* Added space between checkboxes */}
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
        </div>

        {/* Notes */}
        <h2 className="text-lg font-medium mb-4">Notes</h2>
        <label className="block mb-2">Internal Notes</label>
        <textarea className="border border-gray-350 px-3 py-2 rounded w-full h-24 text-gray-400" placeholder="Add any internal notes about this user..."></textarea>

        <div className="border-t pt-4 mt-6 flex flex-col sm:flex-row justify-end gap-3 border-gray-200"> {/* Stack buttons on small screens, row on medium+ */}
          
          <button type="button" className="border border-blue-600 text-blue-600 px-4 py-2 rounded w-full sm:w-auto">Cancel</button> {/* Full width on small, auto on medium+ */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center sm:justify-start space-x-2 hover:bg-blue-700 w-full sm:w-auto"> {/* Center content on small, left on medium+ */}
            <span>👤</span>
            <span>Create User</span>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}