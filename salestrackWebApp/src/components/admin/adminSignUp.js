import React, { useState } from 'react';

function AdminSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    userType: 0,   
    reportsTo: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
  };

  return (
    <div className='form-container'>
      <h1>Admin Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>User Type</label>
          <input type="number" name="userType" value={formData.userType} onChange={handleChange} required />
        </div>
        <div>
          <label>Reports To</label>
          <input type="text" name="reportsTo" value={formData.reportsTo} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignUp;

