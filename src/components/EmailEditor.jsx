import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link"; 
import { Link as LinkIcon } from "lucide-react";
import { useCallback } from "react"; 

const TiptapEditor = ({ onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false, 
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer', 
        },
      }),
    ],
    content: "<p>Write your newsletter content here...</p>",
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px]',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onContentChange) {
        onContentChange(html);
      }
    },
  });
  
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-3 mb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 text-sm font-medium border rounded hover:bg-gray-50 transition-colors ${editor.isActive('bold') ? 'bg-gray-100 text-black border-gray-400' : 'text-gray-600 border-gray-200'}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 text-sm font-medium border rounded hover:bg-gray-50 transition-colors ${editor.isActive('italic') ? 'bg-gray-100 text-black border-gray-400' : 'text-gray-600 border-gray-200'}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 text-sm font-medium border rounded hover:bg-gray-50 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-100 text-black border-gray-400' : 'text-gray-600 border-gray-200'}`}
        >
          Bullet List
        </button>
        <button
          onClick={setLink}
          className={`px-3 py-1.5 text-sm font-medium border rounded hover:bg-gray-50 transition-colors flex items-center gap-1 ${editor.isActive('link') ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 border-gray-200'}`}
        >
          <LinkIcon size={14} /> Link
        </button>
      </div>

      {/* Editor Area */}
      <div className="min-h-[250px] cursor-text">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
};

export default TiptapEditor;