import { useState } from "react";
import InputField from "../InputField";
import Spin from "../Spin";
import { signUpUser } from "../../../Services/AuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterEnquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({});
  const [loginError, setLoginError] = useState(null);

  async function sendEnquiry(e) {
    e.preventDefault();
    setLoading(true);

    const signUpObj={
       name,email,phoneNumber
    }
    try {

      const response = await signUpUser(signUpObj);
      console.log(response);
      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending the enquiry.");
    } finally {
      setLoading(false);
    }
  }

  const showPayload = () => {
    console.log("Payload:", signUpData);
  };

  return (
    <div>
      <ToastContainer />
      <div className="col-lg-6" style={{ margin: "auto" }}>
        <div className="login-container">
          <div>
            <h2 className="form-title">Send Enquiry</h2>
            <form className="login-form" onSubmit={sendEnquiry}>
              <InputField
                type="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                type="email"
                placeholder="Your email address"
                value={email}
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

              {loginError && <p className="login-error">{loginError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEnquiry;
