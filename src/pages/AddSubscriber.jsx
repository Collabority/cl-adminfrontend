import React from 'react';
import { UserPlus,Upload } from 'lucide-react';

export default function AddSubscriberForm() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-1">Add New Subscriber</h1>
      <p className="text-base text-gray-600 mb-6">
        Add individual subscribers or import them in bulk to grow your mailing list.
      </p>

      {/* Main Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side (Forms) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic Info */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                <label className="block mb-1 font-medium text-sm">First Name *</label>
              <input type="text" placeholder="Enter first name..." className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">Last Name</label>
                <input type="text" placeholder="Enter last name" className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>
              
              <div>
              <label className="block mb-1 font-medium text-sm">Email Address *</label>
              <input type="email" placeholder="Enter email address" className="border rounded px-3 py-2 w-full col-span-2 text-gray-400" />
              </div>
              <div>
                <input type="text" placeholder="Enter phone number" className="block mb-1 font-medium text-sm" />
              <input type="tel" placeholder="+1 (555) 123-4567" className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>

                <div>
                <label className="block mb-1 font-medium text-sm">Company</label>
              <input type="text" placeholder="Enter company name" className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>
                <div>
                <label className="block mb-1 font-medium text-sm">Job Title</label>
              <input type="text" placeholder="Enter job title" className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Location</label>
              <input type="text" placeholder="City, Country" className="border rounded px-3 py-2 w-full text-gray-400" />
              </div>
            </div>
          </div>

          {/* Subscription Settings */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-semibold mb-4">Subscription Settings</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Subscription Status</label>
              <div className="space-x-4">
                <label><input type="radio" name="status" defaultChecked /> Active</label>
                <label><input type="radio" name="status" /> Pending Confirmation</label>
                <label><input type="radio" name="status" /> Unsubscribed</label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Segments</label>
              <div className="grid grid-cols-2 gap-2">
                <label><input type="checkbox" /> Customers</label>
                <label><input type="checkbox" /> Prospects</label>
                <label><input type="checkbox" /> General Newsletter</label>
                <label><input type="checkbox" /> Product Updates</label>
                <label><input type="checkbox" /> Marketing Campaigns</label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Subscription Source</label>
              <select className="border rounded px-3 py-2 w-full">
                <option>Select source</option>
                <option>Website Form</option>
                <option>Manual Entry</option>
                <option>CSV import</option>
                <option>Event Registration</option>
                <option>Social Media</option>
                <option>Referral</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Tags</label>
              <input type="text" placeholder="Enter tags separated by commas" className="border rounded px-3 py-2 w-full text-gray-400" />
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-semibold mb-4">Communication Preferences</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Email Frequency</label>
              <div className="space-x-4">
                <label><input type="radio" name="frequency" /> Daily</label>
                <label><input type="radio" name="frequency" defaultChecked /> Weekly</label>
                <label><input type="radio" name="frequency" /> Monthly</label>
                <label><input type="radio" name="frequency" /> Custom</label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Content Interests</label>
              <div className="grid grid-cols-2 gap-2">
                <label><input type="checkbox" /> Blog Posts</label>
                <label><input type="checkbox" /> Product News</label>
                <label><input type="checkbox" /> Industry Updates</label>
                <label><input type="checkbox" /> Events</label>
                <label><input type="checkbox" /> Promotions</label>
                <label><input type="checkbox" /> Case Studies</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Notes</label>
              <textarea placeholder="Add any additional notes about this subscriber..." className="border rounded px-3 py-2 w-full text-gray-400" rows="3" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button className="border px-4 py-2 rounded text-base">Cancel</button>
            <button className="border px-4 py-2 rounded text-base">Save as Draft</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-base flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Add Subscriber
            </button>
          </div>
        </div>

        {/* Right Side – Quick Actions */}
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                <Upload className="w-5 h-5 text-gray-700" />
            </div>
            </div>
        </div>
    </div>
  );
}
