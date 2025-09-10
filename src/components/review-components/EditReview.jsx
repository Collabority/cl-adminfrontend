const EditReview = ({
  handleEditSave,
  editForm,
  setEditForm,
  setEditingReview,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Review</h2>
        <div className="mb-2">
          <label className="block text-base font-semibold">Name</label>
          <input
            className="w-full border rounded px-2 py-1 text-base"
            value={editForm.name}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block text-base font-semibold">Title</label>
          <input
            className="w-full border rounded px-2 py-1 text-base"
            value={editForm.title}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, title: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block text-base font-semibold">Review</label>
          <textarea
            className="w-full border rounded px-2 py-1 text-base"
            value={editForm.review}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, review: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block text-base font-semibold">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-16 border rounded px-2 py-1 text-base"
            value={editForm.rating}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, rating: Number(e.target.value) }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block text-base font-semibold">Status</label>
          <select
            className="w-full border rounded px-2 py-1 text-base"
            value={editForm.status}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-base"
            onClick={handleEditSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded text-base"
            onClick={() => setEditingReview(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditReview };
