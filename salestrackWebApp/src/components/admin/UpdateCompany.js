import React from 'react'

function UpdateCompany() {
  return (
    <>
       <h3>Edit Company</h3>
      <form>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Admin Name</label>
          <input
            type="text"
            name="adminName"
            value={company.adminName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={company.phoneNumber}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </form>
    </>
  )
}

export default UpdateCompany
