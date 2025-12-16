import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CampaignAnalytics.css'; // We will create this CSS file below

const CampaignAnalytics = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Campaign Data on Page Load
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // You need to create this route in backend (see Step 3 below)
        const res = await axios.get('http://localhost:5000/api/campaigns/all');
        setCampaigns(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading Analytics...</div>;

  return (
    <div className="analytics-container">
      <h2>Campaign Reports</h2>
      
      <div className="campaign-list">
        {campaigns.map((campaign) => (
          
          /* --- YOUR SNIPPET STARTS HERE (Wrapped in a Card) --- */
          <div className="campaign-card" key={campaign._id}>
            
            <div className="card-header">
              <h3>{campaign.campaignName}</h3>
              <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                {campaign.status}
              </span>
            </div>

            <p className="subject-line">Subject: {campaign.subjectLine}</p>

            <div className="stats-row">
              <div className="stat">
                <span className="stat-label">Sent</span>
                <strong className="stat-value">{campaign.recipientCount}</strong>
              </div>
              
              <div className="stat">
                <span className="stat-label">Opens</span>
                <strong className="stat-value">{campaign.stats.opens}</strong>
              </div>
              
              <div className="stat">
                <span className="stat-label">Open Rate</span>
                <strong className="stat-value">
                  {campaign.recipientCount > 0 
                    ? ((campaign.stats.opens / campaign.recipientCount) * 100).toFixed(1) 
                    : 0}%
                </strong>
              </div>
            </div>
            
            <small className="sent-date">
              Sent on: {new Date(campaign.createdAt).toLocaleDateString()}
            </small>

          </div>
          /* --- YOUR SNIPPET ENDS HERE --- */
          
        ))}
      </div>
    </div>
  );
};

export default CampaignAnalytics;