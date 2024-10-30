
import React, { useState } from 'react';
import './login.css';
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"
import { registerEnquiry } from '../../Services/AuthService';
import myToaster from '../../utils/toaster';
import { useForm } from "react-hook-form";
import Spin from './Spin';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegisterEnquiry() {
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const response= await registerEnquiry(data)
    if(response.isSuccess){
      myToaster.showSuccessToast(response.message);
      navigate("/")
    }
    else{
      myToaster.showErrorToast(response.message);
    }
    setLoading(false)

  }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group pb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  id="name"
                {...register("name", { required: "Name is required" })}

                />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}

              </div>
              <div className="form-group pb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  {...register("email", { required: "Email is required",})}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>
              <div className="form-group pb-3">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="form-control"
                  id="phoneNumber"
                  {...register("phoneNumber",{required:"Phone Number is required"})}
                />
                {errors.phoneNumber &&  <span className="text-danger">{errors.phoneNumber.message}</span>}

              </div>
              <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 font-weight-bold mt-2 p-3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }} 
                  >
                    Register Now
                    {loading && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "8px",
                        }}
                      >
                        <Spin />
                      </span>
                    )}
                  </button>
                </div>
            </form>
            <div className="pt-4 text-center">
              Already a member? <Link to ="/login" >Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEnquiry;