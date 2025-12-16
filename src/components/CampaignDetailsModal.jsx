import React from "react";
import { X, Trash, Mail, Users, MousePointer } from "lucide-react";

export const CampaignDetailsModal = ({ isOpen, onClose, campaign, onDelete }) => {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{campaign.campaignName}</h2>
            <span className={`text-xs px-2 py-1 rounded font-semibold uppercase ${
              campaign.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {campaign.status}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="flex justify-center text-blue-500 mb-1"><Users size={20} /></div>
              <div className="text-2xl font-bold text-gray-800">{campaign.recipientCount || 0}</div>
              <div className="text-xs text-gray-500 uppercase">Recipients</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="flex justify-center text-green-500 mb-1"><Mail size={20} /></div>
              <div className="text-2xl font-bold text-gray-800">{campaign.stats?.opens || 0}</div>
              <div className="text-xs text-gray-500 uppercase">Opens</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="flex justify-center text-purple-500 mb-1"><MousePointer size={20} /></div>
              <div className="text-2xl font-bold text-gray-800">{campaign.stats?.clicks || 0}</div>
              <div className="text-xs text-gray-500 uppercase">Clicks</div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Subject Line</label>
              <p className="text-gray-800 font-medium">{campaign.subjectLine}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">From Name</label>
                <p className="text-gray-600">{campaign.fromName}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">From Email</label>
                <p className="text-gray-600">{campaign.fromEmail}</p>
              </div>
            </div>

            {/* Content Preview */}
            <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Email Content Preview</label>
            <div 
                // ADDED: 'break-words' and 'break-all'
                className="border rounded-lg p-4 bg-gray-50 min-h-[200px] prose prose-sm max-w-none break-words break-all"
                dangerouslySetInnerHTML={{ __html: campaign.content }}
            />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Created: {new Date(campaign.createdAt).toLocaleDateString()}
          </p>
          <button 
            onClick={() => onDelete(campaign._id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash size={18} />
            Delete Campaign
          </button>
        </div>
      </div>
    </div>
  );
};