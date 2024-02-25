import React from "react";
import "./submit.css";

const Submit = ({generaldetails, addressdetails}) => {

  return (
    <div className="App">
      <h2 >Your Profile</h2>
      <hr />
      <div className="container">
      <div className="section">
        <p className="section-heading">Personal Details</p>
        <div className="form-group-row">
          <div className="form-group">
            <span>First Name</span>
            <br />
            <p className="para" >{generaldetails.firstName || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>Last Name</span>
            <br />
            <p className="para" >{generaldetails.lastName || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>Email</span>
            <br />
            <p className="para" >{generaldetails.email || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>DOB</span>
            <br />
            <p className="para" >{generaldetails.dob || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="section">
        <p className="section-heading">Mailing Address</p>
        <div className="form-group-row">
          <div className="form-group">
            <span>Address Line 1</span>
            <br />
            <p className="para" >{addressdetails.address || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>Address Line 2</span>
            <br />
            <p className="para" >{addressdetails.address || "N/A"}</p>
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <span>Country</span>
            <br />
            <p className="para" >{addressdetails.country || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>State</span>
            <br />
            <p className="para" >{addressdetails.state || "N/A"}</p>
          </div>
          <div className="form-group">
            <span>City</span>
            <br />
            <p className="para" >{addressdetails.city || "N/A"}</p>
          </div>          
          <div className="form-group">
            <span>Pincode</span>
            <br />
            <p className="para" >{addressdetails.pincode || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
      <hr/>

      <div className="button-gp">
          <button className="save-continue-bt">
            Save & Continue
          </button>
        </div>
    </div>
  );
};

export default Submit;
