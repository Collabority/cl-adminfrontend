import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, Save, ArrowRight, Loader2, Users, Clock, Calendar } from "lucide-react"; 
import TiptapEditor from "../components/EmailEditor"; 
import instance from "../lib/axios";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saveType, setSaveType] = useState(""); // 'draft' or 'continue'

  // --- Test Email State ---
  const [showTestModal, setShowTestModal] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);

  // --- Form Data ---
  const [formData, setFormData] = useState({
    campaignName: "",
    subjectLine: "",
    previewText: "",
    fromName: "Collabority Team",
    fromEmail: "collaborityofficial@gmail.com",
    replyToEmail: "",
    recipientType: "all", 
    scheduleType: "now",  
    scheduledDate: "",    
  });

  const [editorContent, setEditorContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (html) => {
    setEditorContent(html);
  };

  // --- SAVE LOGIC (Fixed) ---
  const handleSave = async (actionType) => {
    // 1. Basic Validation
    if (!formData.campaignName || !formData.subjectLine) {
      alert("Please provide at least a Campaign Name and Subject Line.");
      return;
    }

    // 2. Schedule Validation
    if (formData.scheduleType === "later" && !formData.scheduledDate) {
      alert("Please select a date and time for scheduling.");
      return;
    }

    setLoading(true);
    setSaveType(actionType);

    try {
      // Determine Status
      let status = "Draft";
      if (actionType === "continue") {
         status = formData.scheduleType === "now" ? "Sent" : "Scheduled"; 
      }

      // Convert Local Date to UTC for the Backend
      let finalScheduledDate = formData.scheduledDate;
      if (formData.scheduleType === "later" && formData.scheduledDate) {
          finalScheduledDate = new Date(formData.scheduledDate).toISOString();
      }

      const payload = {
        ...formData,
        scheduledDate: finalScheduledDate, 
        content: editorContent, 
        status: status,
      };

      // 3. Create Campaign
      const response = await instance.post("/campaigns/create", payload);

      // ✅ CRITICAL FIX: Extract the ID correctly
      // Backend returns: { success: true, data: { _id: "..." } }
      // Axios wraps it in: response.data
      // So correct path is: response.data.data._id
      const newCampaignId = response.data?.data?._id || response.data?._id;

      // 4. Handle "Send Now" vs "Schedule"
      if (actionType === "continue" && formData.scheduleType === "now") {
          if (newCampaignId) {
            await instance.post("/campaigns/send", { campaignId: newCampaignId });
            alert("Campaign sent successfully!");
          } else {
            console.error("Could not find Campaign ID in response:", response);
            alert("Campaign created, but failed to trigger send. Check console.");
          }
      } 
      else if (actionType === "continue" && formData.scheduleType === "later") {
          alert(`Campaign scheduled for ${new Date(formData.scheduledDate).toLocaleString()}`);
      }
      else {
          alert("Draft saved successfully!");
      }

      navigate("/newsletter");

    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign.");
    } finally {
      setLoading(false);
      setSaveType("");
    }
  };

  const handleSendTest = async (e) => {
    e.preventDefault();
    if (!testEmail) return;

    setSendingTest(true);
    try {
      await instance.post("/newsletter/send-test", {
        subject: formData.subjectLine,
        content: editorContent,
        recipientEmail: testEmail,
        fromName: formData.fromName
      });
      alert(`Test email sent to ${testEmail}`);
      setShowTestModal(false);
      setTestEmail(""); 
    } catch (error) {
      console.error("Error sending test email:", error);
      alert("Failed to send test email.");
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen relative pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Campaign</h1>
          <p className="text-sm text-gray-500">Design and schedule your new email blast.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowTestModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            <Send size={16} />
            Send Test
          </button>

          <button 
            onClick={() => handleSave("draft")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {loading && saveType === "draft" ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Save Draft
          </button>

          <button 
            onClick={() => handleSave("continue")} 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 font-medium transition-colors shadow-sm"
          >
            {loading && saveType === "continue" ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                {formData.scheduleType === 'now' ? 'Send Now' : 'Schedule'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        
        {/* --- 1. CAMPAIGN SETTINGS --- */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 border-b pb-2">Campaign Settings</h2>

          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Internal Campaign Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleChange}
                placeholder="e.g. Monthly Newsletter - Jan 2025"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <p className="text-xs text-gray-400 mt-1">Only visible to your team.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="subjectLine"
                  value={formData.subjectLine}
                  onChange={handleChange}
                  placeholder="What's inside?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preview Text</label>
                <input
                  type="text"
                  name="previewText"
                  value={formData.previewText}
                  onChange={handleChange}
                  placeholder="Text shown after subject line..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                <input
                  type="text"
                  name="fromName"
                  value={formData.fromName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                <input
                  type="email"
                  name="fromEmail"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reply-To (Optional)</label>
                <input
                  type="email"
                  name="replyToEmail"
                  value={formData.replyToEmail}
                  onChange={handleChange}
                  placeholder="collaborityofficial@gmail.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. RECIPIENTS & SCHEDULING --- */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} className="text-blue-500"/> Recipients
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.recipientType === 'all' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="recipientType" value="all" checked={formData.recipientType === 'all'} onChange={handleChange} className="w-4 h-4 text-blue-600"/>
                <div>
                  <span className="block font-medium text-gray-800">All Subscribers</span>
                  <span className="text-xs text-gray-500">Send to entire active list</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.recipientType === 'test_group' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="recipientType" value="test_group" checked={formData.recipientType === 'test_group'} onChange={handleChange} className="w-4 h-4 text-blue-600"/>
                 <div>
                  <span className="block font-medium text-gray-800">Test Group Only</span>
                  <span className="text-xs text-gray-500">Send only to internal team</span>
                </div>
              </label>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-500"/> Scheduling
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.scheduleType === 'now' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="scheduleType" value="now" checked={formData.scheduleType === 'now'} onChange={handleChange} className="w-4 h-4 text-blue-600"/>
                <span className="font-medium text-gray-800">Send Immediately</span>
              </label>

              <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${formData.scheduleType === 'later' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <input type="radio" name="scheduleType" value="later" checked={formData.scheduleType === 'later'} onChange={handleChange} className="w-4 h-4 text-blue-600"/>
                  <span className="font-medium text-gray-800">Schedule for Later</span>
                </div>
                {formData.scheduleType === 'later' && (
                  <div className="ml-7 mt-1 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2">
                      <Calendar size={16} className="text-gray-500"/>
                      <input 
                        type="datetime-local" 
                        name="scheduledDate" 
                        value={formData.scheduledDate} 
                        onChange={handleChange} 
                        className="w-full text-sm outline-none text-gray-700"
                      />
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* --- 3. EDITOR --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Email Content</h2>
           </div>
           <TiptapEditor onContentChange={handleEditorChange} />
        </div>

      </div>

      {/* --- TEST EMAIL MODAL --- */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Send size={18} className="text-blue-600"/> Send Test Email
              </h3>
              <button onClick={() => setShowTestModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSendTest} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.name@company.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowTestModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={sendingTest} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70">
                  {sendingTest ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  Send Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreateCampaign;