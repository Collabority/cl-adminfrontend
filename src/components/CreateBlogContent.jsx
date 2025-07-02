import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ formData, setFormData }) => {
  const editorRef = useRef(null);
  const quillInstanceRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start writing your blog post content here...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "code"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["code-block"],
          ],
        },
      });

      // Set initial content
      if (formData.content) {
        quillInstanceRef.current.root.innerHTML = formData.content;
      }

      // Update state on change
      quillInstanceRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setFormData((prev) => ({ ...prev, content: html }));
      });
    }
  }, [setFormData]);

  useEffect(() => {
    if (
      quillInstanceRef.current &&
      formData.content !== quillInstanceRef.current.root.innerHTML
    ) {
      quillInstanceRef.current.root.innerHTML = formData.content;
    }
  }, [formData.content]);

  return (
    <div className="bg-white rounded-lg shadow flex flex-col p-4 w-full  mx-auto">
      <h1 className="text-xl font-semibold text-black mb-3">Content</h1>
      <div
        ref={editorRef}
        className="w-full min-h-[300px] border border-gray-300 rounded-b-xl overflow-hidden [&>.ql-editor]:min-h-[300px] [&>.ql-editor]:cursor-text"
      />
    </div>
  );
};

export default QuillEditor;
