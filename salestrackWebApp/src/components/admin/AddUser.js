import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { addUser } from '../../Services/AuthService';
import myToaster from '../../utils/toaster';

const AddUserForm = ({ props }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        userType: 0,
        reportsTo: ""
    });
    const managerId="91855f4a-f9af-4044-8535-90f8ec8021c2"
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailError2, setEmailError2] = useState(false);
    const [userTypeError, setUserTypeError] = useState(false);
    const [reportsToError, setReportsToError] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'name') {
            setNameError(value.length === 0);
        }

        if (name === 'email') {
            setEmailError(value.length === 0);
            setEmailError2(!isValidEmail(value) && value.length > 0);
        }

        if (name === 'userType') {
            setUserTypeError(value.length === 0);
        }

        if (name === 'reportsTo') {
            setReportsToError(value.length === 0);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    console.log(formData);
        

        const { name, email, userType, reportsTo } = formData;

        setNameError(!name);
        setEmailError(!email);
        setUserTypeError(!userType);
        setReportsToError(!reportsTo);

        if (email && !emailError) {
            setEmailError2(!isValidEmail(email));
        }

        if (name && email && userType && reportsTo && isValidEmail(email)) {
            setFormValid(true);
        }


        console.log("Payload being sent:", formData);

        try {
            formData.userType=Number(formData.userType)
            const response = await addUser(formData);
            console.log(response);
            if (response.isSuccess) {
                myToaster.showSuccessToast(response.message);
            } else {
                myToaster.showErrorToast(response.message);
            }
        } catch (error) {
            console.error("Error:", error);
            myToaster.showErrorToast("Failed to register user.");
        }
        



    };

        return (
            <>
                <div className="card shadow-sm border-0 px-2 rounded-2 mb-3 mx-auto w-50 bg-light">
                    <div className="card-header bg-transparent border-0 text-center ">
                        <h3>Register new user</h3>
                    </div>
                    <div className="card-body">
                        <form action="/" onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-group">
                                <label className="mb-0">Name<span className="text-danger">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {nameError && (
                                    <div className="alert alert-danger mt-2">Name is a required field.</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="mb-0">Email<span className="text-danger">*</span></label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {emailError && (
                                    <div className="alert alert-danger mt-2">Email is a required field.</div>
                                )}
                                {emailError2 && (
                                    <div className="alert alert-danger mt-2">Email invalid.</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="mb-0">Phone Number (Optional)</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="mb-0">User Type<span className="text-danger">*</span></label>
                                <select
                                    name="userType"
                                    className="form-control"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select User Type</option>
                                    <option value="1">Sales Executive</option>
                                    <option value="2">Sales Manager</option>
                                </select>
                                {userTypeError && (
                                    <div className="alert alert-danger mt-2">User Type is a required field.</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="mb-0">Reports To<span className="text-danger">*</span></label>
                                <select
                                    name="reportsTo"
                                    className="form-control"
                                    value={formData.reportsTo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select</option>
                                    <option value={managerId}>Manager</option>
                                    
                                </select>
                                {reportsToError && (
                                    <div className="alert alert-danger mt-2">Reports To is a required field.</div>
                                )}
                            </div>

                            <p className="text-center mt-3">
                                <Button
                                    type="submit"
                                    className="btn btn-primary w-100 "
                                >Register</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </>
        );
    
    }

export default AddUserForm;
