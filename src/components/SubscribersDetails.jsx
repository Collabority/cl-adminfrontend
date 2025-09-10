import { FaUserCircle, FaTimes } from "react-icons/fa";

const SubscribersDetails = ({ isOpen, onClose, subscriber }) => {
  if (!isOpen || !subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-gray-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-gray-300 text-6xl mb-2" />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {subscriber.name || "No Name"}
          </h2>
          <span className="text-sm text-gray-500">{subscriber.email}</span>
        </div>
        <div className="divide-y divide-gray-100">
          <DetailRow label="Status" value={subscriber.status || "-"} />
          <DetailRow label="Segment" value={subscriber.segment || "-"} />
          <DetailRow
            label="Subscribed On"
            value={
              subscriber.createdAt
                ? new Date(subscriber.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export { SubscribersDetails };
