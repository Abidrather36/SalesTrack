
import React from 'react';
import './login.css'; // Custom CSS for styling if needed
import logo from "../../utils/logo_salestrack_blue.png"

function RegisterEnquiry() {
  return (
    <div className="container">
      <div className="row m-5 no-gutters shadow-lg">
        <div className="col-md-6 d-none d-md-block">
          <img
           src="https://img.freepik.com/free-vector/customer-support-flat-design-illustration_23-2148889374.jpg?w=740&t=st=1725513124~exp=1725513724~hmac=0b88373e2075b3e0b214c074602fcc7224cf99d914f88953399486897ccd9902"
            className="img-fluid rounded-3"
            alt="Background"
            style={{ minHeight: '100%' }}
          />
        </div>
        <div className="col-md-6 bg-white p-5 rounded-3">
          <div  style={{maxWidth:"60%",marginLeft:"90px"}}>

        <img src={logo}/>
        </div>
          <h3 className="pb-3">Register Enquiry</h3>
          <div className="form-style">
            <form>
              <div className="form-group pb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  id="exampleInputName"
                />
              </div>
              <div className="form-group pb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group pb-3">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="form-control"
                  id="exampleInputPhone"
                />
              </div>
              <div className="pb-2">
                <button
                  type="submit"
                  className="btn btn-primary w-100 font-weight-bold mt-2"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
            <div className="pt-4 text-center">
              Already a member? <a href="#">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEnquiry;