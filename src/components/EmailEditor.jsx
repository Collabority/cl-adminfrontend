import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link"; // <--- CHANGE 1: Import Link
import { CloudUpload, Link as LinkIcon } from "lucide-react"; // Import Link Icon
import { useState, useCallback } from "react"; // Import useCallback

const TiptapEditor = ({ onContentChange }) => {
  const [template, setTemplate] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [recipientOption, setRecipientOption] = useState("all");
  const [sendTimeOption, setSendTimeOption] = useState("now");

  const editor = useEditor({
    extensions: [
      StarterKit,
      // <--- CHANGE 2: Add Link Extension Configuration
      Link.configure({
        openOnClick: false, // Prevents opening link while editing
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer', // Makes it look like a link
        },
      }),
    ],
    content: "<p>Write your newsletter content here...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onContentChange) {
        onContentChange(html);
      }
    },
  });

  // <--- CHANGE 3: Add the Link Logic Function
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleTemplateChange = (e) => setTemplate(e.target.value);
  const handleImageUpload = (e) => setHeaderImage(e.target.files[0]);

  if (!editor) {
    return null;
  }

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
          <option value="Announcement">Announcement Template</option>
          <option value="Custom">Custom Template</option>
        </select>
      </div>

      <div className="border rounded-md p-2 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      <div className="mt-4 space-x-2 border-b pb-4 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 border rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          Bullet List
        </button>

        {/* <--- CHANGE 4: Add the Link Button here */}
        <button
          onClick={setLink}
          className={`px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1 ${editor.isActive('link') ? 'bg-blue-100 text-blue-600 border-blue-300' : ''}`}
        >
          <LinkIcon size={16} /> Link
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

      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
        <div>
          <h2 className="text-lg font-semibold mb-4">Recipients</h2>
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
              <span>All Subscribers</span>
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

        <div>
          <h2 className="text-lg font-semibold mb-4">Scheduling</h2>
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
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition">
          Send Test Email
        </button>
      </div>

    </div>
  );
};

export default TiptapEditor;