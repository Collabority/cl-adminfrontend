import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { CloudUpload } from "lucide-react";
import { useState } from "react";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your newsletter content here...</p>",
  });
  const [template, setTemplate] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    setTemplate(selected);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setHeaderImage(file);
  };

  const [recipientOption, setRecipientOption] = useState("all");
  const [sendTimeOption, setSendTimeOption] = useState("now");
  const [timezone, setTimezone] = useState("UTC");
  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Email Content</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Template
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold text-black"
          value={template}
          onChange={handleTemplateChange}
        >
          <option value="">Select a template</option>
          <option value="Newsletter">Newsletter Template</option>
          <option value="Promotional">Promotional Template</option>
          <option value="Announcement">Announcement Template You</option>
          <option value="Custom">Custom Template You</option>
        </select>
      </div>

      <div className="border rounded-md p-2">
        <EditorContent editor={editor} />
      </div>

      <div className="mt-4 space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Bullet List
        </button>
      </div>
      {/* Header Image Upload Box */}
      <div className="mb-6 mt-4">
        <h2 className="text-xl font-semibold mb-2">Header Image</h2>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-48 cursor-pointer hover:bg-gray-50 transition"
        >
          <CloudUpload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">
            Drop your image here or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Recommended size: 600×200px (PNG, JPG)
          </p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {headerImage && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: <span className="font-medium">{headerImage.name}</span>
          </p>
        )}
      </div>
      <div className="p-4 space-y-6">
      {/* Recipients */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recipients</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="recipients"
              value="all"
              checked={recipientOption === "all"}
              onChange={() => setRecipientOption("all")}
              className="accent-blue-600"
            />
            <span>All Subscribers (1,248 people)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="recipients"
              value="segments"
              checked={recipientOption === "segments"}
              onChange={() => setRecipientOption("segments")}
              className="accent-blue-600"
            />
            <span>Specific Segments</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="recipients"
              value="test"
              checked={recipientOption === "test"}
              onChange={() => setRecipientOption("test")}
              className="accent-blue-600"
            />
            <span>Test Group Only</span>
          </label>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduling</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="schedule"
              value="now"
              checked={sendTimeOption === "now"}
              onChange={() => setSendTimeOption("now")}
              className="accent-blue-600"
            />
            <span>Send Now</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="schedule"
              value="later"
              checked={sendTimeOption === "later"}
              onChange={() => setSendTimeOption("later")}
              className="accent-blue-600"
            />
            <span>Schedule for Later</span>
          </label>
        </div>

        {/* Timezone Dropdown */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:outline-none"
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="IST">IST (India Standard Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
          </select>
        </div>
      </div>
    </div>
    <div className="p-4">
      <button className="p-2 bg-blue-500 rounded-md text-white cursor-pointer">Give it a Test</button>
    </div>
    </div>
  );
};

export default TiptapEditor;
