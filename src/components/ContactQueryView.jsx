import { FaUserCircle, FaTimes, FaReply } from "react-icons/fa"; // Added FaReply

const ContactQueryView = ({ selectedQuery, setSelectedQuery }) => {
  if (!selectedQuery) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Changed max-w-md to max-w-2xl for better readability of long messages */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-gray-100 max-h-[90vh] flex flex-col">
        
        {/* Header with Close Button */}
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            {selectedQuery.avatar ? (
              <img
                src={selectedQuery.avatar}
                alt={selectedQuery.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
              />
            ) : (
              <FaUserCircle className="text-gray-300 text-5xl" />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {selectedQuery.name || "No Name"}
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                {selectedQuery.email}
              </p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-red-500 text-xl transition p-2"
            onClick={() => setSelectedQuery(null)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</span>
                    <p className={`font-semibold mt-1 ${getStatusColor(selectedQuery.status)}`}>
                        {selectedQuery.status || "-"}
                    </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</span>
                    <p className="text-gray-700 font-medium mt-1">
                        {selectedQuery.date
                            ? new Date(selectedQuery.date).toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "-"}
                    </p>
                </div>
            </div>

            <div className="mb-2">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Subject</span>
                <p className="text-lg font-bold text-gray-900 mt-1">{selectedQuery.subject || "No Subject"}</p>
            </div>

            <div className="py-3">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Message Content</span>
                <div className="mt-2 text-gray-800 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {selectedQuery.message || "-"}
                </div>
            </div>
        </div>

        {/* Footer with Action Button */}
        <div className="mt-6 pt-4 border-t flex justify-end gap-3">
            <button 
                onClick={() => setSelectedQuery(null)}
                className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
            >
                Close
            </button>
            <a 
                href={`mailto:${selectedQuery.email}?subject=Re: ${selectedQuery.subject}`}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200"
            >
                <FaReply /> Reply via Email
            </a>
        </div>

      </div>
    </div>
  );
};

// Helper for status colors
const getStatusColor = (status) => {
    switch(status) {
        case "Unread": return "text-red-500";
        case "Replied": return "text-green-600";
        case "Read": return "text-blue-500";
        case "Archived": return "text-gray-500";
        default: return "text-gray-800";
    }
};

export { ContactQueryView };