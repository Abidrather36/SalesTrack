import React, { useState } from 'react';
import axios from 'axios';

const AddMultipleLeads = () => {
  const [leads, setLeads] = useState([
    {
      name: '',
      email: '',
      phoneNumber: '',
      leadSourceId: '',
      companyId: '',
      leadCategoryId: '',
      leadCompanyId: '',
      comment: '',
      assignTo: '',
      finalStatus: '',
      leadRank: 0,
      assignToUser:''
    },
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLeads = [...leads];
    updatedLeads[index][name] = value;
    setLeads(updatedLeads);
  };

  const handleAddLead = () => {
    setLeads([
      ...leads,
      {
        name: '',
        email: '',
        phoneNumber: '',
        leadSourceId: '',
        companyId: '',
        leadCategoryId: '',
        leadCompanyId: '',
        comment: '',
        assignTo: '',
        finalStatus: '',
        leadRank: 0,
        assignToUser:''
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // POST request to your API to add leads
      const response = await axios.post('/api/leads/add', { leadModels: leads });

      if (response.status === 201) {
        alert('Leads added successfully!');
        setLeads([
          {
            name: '',
            email: '',
            phoneNumber: '',
            leadSourceId: '',
            companyId: '',
            leadCategoryId: '',
            leadCompanyId: '',
            comment: '',
            assignTo: '',
            finalStatus: '',
            leadRank: 0,
            assignToUser:'',
          },
        ]); // Reset the form after successful submission
      }
    } catch (err) {
      setError('Error adding leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Multiple Leads</h2>
      <form onSubmit={handleSubmit}>
        {leads.map((lead, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={lead.name}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={lead.email}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={lead.phoneNumber}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label>Lead Source ID:</label>
              <input
                type="text"
                name="leadSourceId"
                value={lead.leadSourceId}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Company ID:</label>
              <input
                type="text"
                name="companyId"
                value={lead.companyId}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Lead Category ID:</label>
              <input
                type="text"
                name="leadCategoryId"
                value={lead.leadCategoryId}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Lead Company ID:</label>
              <input
                type="text"
                name="leadCompanyId"
                value={lead.leadCompanyId}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
         
            <div>
              <label>Assign To:</label>
              <input
                type="text"
                name="assignTo"
                value={lead.assignTo}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Final Status:</label>
              <select
                name="finalStatus"
                value={lead.finalStatus}
                onChange={(e) => handleInputChange(e, index)}
                required
              >
                <option value="">Select Final Status</option>
                <option value="New">New</option>
                <option value="InProgress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label>Lead Rank:</label>
              <input
                type="number"
                name="leadRank"
                value={lead.leadRank}
                onChange={(e) => handleInputChange(e, index)}
                min="1"
                max="5"
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddLead}>
          Add Another Lead
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Leads'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddMultipleLeads;
