import { FaUserCircle, FaTimes, FaFileAlt } from "react-icons/fa";

const JobApplicantDetailsView = ({
  selectedApplicant,
  setSelectedApplicant,
}) => {
  if (!selectedApplicant) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-gray-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
          onClick={() => setSelectedApplicant(null)}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-gray-300 text-6xl mb-2" />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {selectedApplicant.name || "No Name"}
          </h2>
          <span className="text-sm text-gray-500">
            {selectedApplicant.email}
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          <DetailRow
            label="Position"
            value={selectedApplicant.position || "-"}
          />
          <DetailRow
            label="Department"
            value={selectedApplicant.department || "-"}
          />
          <DetailRow
            label="Experience"
            value={
              selectedApplicant.experience
                ? `${selectedApplicant.experience} years`
                : "-"
            }
          />
          <DetailRow label="Status" value={selectedApplicant.status || "-"} />
          <DetailRow
            label="Applied On"
            value={selectedApplicant.appliedDate || "-"}
          />
          <div className="py-3 flex items-center gap-2">
            <span className="text-gray-500 font-medium">Resume:</span>
            {selectedApplicant.resume ? (
              <a
                href={selectedApplicant.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline flex items-center gap-1"
              >
                <FaFileAlt className="inline-block" />
                View Resume
              </a>
            ) : (
              <span className="text-gray-400">No Resume</span>
            )}
          </div>
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

export { JobApplicantDetailsView };
