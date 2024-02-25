import CustomizedSteppers from "../HoriStepper";
import React, { useState } from "react";
import "./general.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const General = ({ onSubmit }) => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
  });

  // used useHistory for navigating between components
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormFilled = () => {
    return (
      details.firstName !== "" &&
      details.lastName !== "" &&
      details.email !== "" &&
      details.dob !== ""
    );
  };

  // fucnion for valid email . 
  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(details.email);
  };

// funtion for calculaing age 
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const differenceInMilliseconds = Date.now() - birthDate.getTime();
    const ageDate = new Date(differenceInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // checking age condition
  const isAgeValid = () => {
    const age = calculateAge(details.dob);
    return age >= 10 && age <= 30;
  };

  return (
    <div className="App">
      <h2>Complete Student Profile</h2>
      <hr />
      <CustomizedSteppers activeStep={activeStep}/>
      <div className="personal-details-containers">
        <p className="subHead">Let's Enter your Personal Details</p>
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email id"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} />
          </div>
        </div>
      </div>
      <hr />
        <div className="save-continue-container">
        <button id="btn1" className="save-continue-btn1">
          Back
        </button>
          <button
          // assisgning className according to the conditions and disabling buttons when form is not validated
           id="checkBut" className={`save-continue-btn ${
              isFormFilled() && isValidEmail() && isAgeValid() ? "" : "disabled"
            }`}
            onClick={() => {
              if (isFormFilled() && isValidEmail() && isAgeValid()) {
                onSubmit(details);
                history.push("/address");
              }
            }}
            disabled={!isFormFilled() || !isValidEmail() || !isAgeValid()}
          >
            Save & Continue
          </button>
        </div>
    </div>
  );
};

export default General;
