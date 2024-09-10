import {React,useState} from "react";
import { getAllEnquiries } from "../../Services/AuthService";


function EnquiryList() {
  const [enquiry, setEnquiry] = useState([]);

  const getEnquiryList = async () => {
    try {
      const response = await getAllEnquiries();
      setEnquiry(response.result);
      console.log(enquiry);
    } catch (err) {
      console.log(err);
    }
  };
  return(
    <>
    <div>
        <button className="btn btn-primary" onClick={getEnquiryList}>Show Enquiries</button>
    </div>
    </>
  )
}

export default EnquiryList;
