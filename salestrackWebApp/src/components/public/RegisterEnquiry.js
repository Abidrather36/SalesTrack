import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpStatusCode } from "axios";
import myToaster from "../../utils/toaster";
import Spin from "../public/Spin"
import InputField from "./InputField";
import { signUpUser } from "../../Services/AuthService";

function RegisterEnquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({});

  async function sendEnquiry(e) {
    e.preventDefault();
    setLoading(true);

    const signUpObj = {
      name,
      email,
      phoneNumber,
    };
    try {
      const response = await signUpUser(signUpObj);
      console.log(response);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      if (error.message === HttpStatusCode.BadRequest) {
        myToaster.showErrorToast("incorrect payload!");
      } else {
        myToaster.showErrorToast(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const showPayload = () => {
    console.log("Payload:", signUpData);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex" style={{ display: "flex", flexDirection: "row" }}>
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src="https://img.freepik.com/free-vector/customer-support-flat-design-illustration_23-2148889374.jpg?w=740&t=st=1725513124~exp=1725513724~hmac=0b88373e2075b3e0b214c074602fcc7224cf99d914f88953399486897ccd9902"
            alt="Enquiry"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "80%", marginLeft: "50px" }}
          />
        </div>

        <div className="col-lg-6 mb-4-lg-0">
          <div className="login-container">
            <h2 className="form-title">Send Enquiry</h2>
            <form className="login-form" onSubmit={sendEnquiry}>
              <InputField
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                type="email"
                placeholder="Your email address"
                value={email}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              {loading ? (
                <button
                  type="submit"
                  className="login-button"
                  disabled
                  onClick={showPayload}
                >
                  <Spin />
                </button>
              ) : (
                <button type="submit" className="login-button">
                  Send
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterEnquiry;
