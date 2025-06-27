 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Reviews &amp; Testimonials</span>
          <svg className="mx-2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-black font-bold">Add New Review</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="border border-gray-300 rounded-lg px-5 py-2 text-gray-700 font-semibold bg-white shadow-sm hover:bg-gray-50 transition text-base">Cancel</button>
          <button className="border border-blue-600 text-blue-600 rounded-lg px-5 py-2 font-semibold bg-white shadow-sm hover:bg-blue-50 transition text-base">Save as Draft</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-bold transition text-base shadow-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            Publish Review
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-1">Add New Review &amp; Testimonial</h2>
        <p className="text-gray-500 mb-6">Create a new customer review or testimonial to showcase on your website.</p>
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Reviewer Name *</label>
              <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" placeholder="Enter reviewer's full name" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Designation/Title</label>
              <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" placeholder="e.g., CEO, Marketing Director" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Company/Organization</label>
              <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" placeholder="Company name" />
            </div>
          </div>
        </div>
        {/* Profile Picture */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-4xl mb-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </div>
              <span className="text-xs text-gray-400">Upload Profile Picture</span>
            </div>
            <div className="flex-1">
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                <input type="file" className="hidden" />
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <span className="text-blue-600 text-sm font-semibold">Upload a file</span> or drag and drop
                  <span className="text-xs text-gray-400">PNG, JPG, GIF up to 2MB</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        {/* Rating & Review Content */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Rating &amp; Review Content</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rating *</label>
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`Rate ${star}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-gray-400 text-sm">Click to rate</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Review Title</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" placeholder="Brief title for the review" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Review Content *</label>
            <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm min-h-[100px]" placeholder="Write the detailed review or testimonial content..." />
            <div className="text-xs text-gray-400 mt-1">Minimum 50 characters recommended</div>
          </div>
        </div>

        
        {/* Additional settings */}
        <div className="mb-4">  
      
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Status:</label>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>Draft</option>
              <option>Published</option>
              <option>Pending</option>
            </select>
            <button className="ml-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-semibold bg-white shadow-sm hover:bg-gray-50 transition text-base">Preview</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-bold transition text-base shadow-sm">Save Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview; 