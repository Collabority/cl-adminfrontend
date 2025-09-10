const SubscribersDetails = ({ isOpen, onClose, subscriber }) => {
  if (!isOpen || !subscriber) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Subscriber Details</h2>
        <p>
          <strong>Email:</strong> {subscriber.email}
        </p>
        <p>
          <strong>Name:</strong> {subscriber.name}
        </p>
        <p>
          <strong>Status:</strong> {subscriber.status}
        </p>
        <p>
          <strong>Segment:</strong> {subscriber.segment}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(subscriber.createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export { SubscribersDetails };
