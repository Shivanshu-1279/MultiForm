import React, { useEffect, useState } from "react";
import "./address.css";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomizedSteppers from "../HoriStepper";

const Address = ({ onSubmit }) => {
  const [details, setDetails] = useState({
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
  });
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1); 

  // will run only once.
  useEffect(() => {
    loadCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // checking if evey  field is filled or not.
  const isFormFilled = () => {
    return (
      details.address !== "" &&
      details.country !== "" &&
      details.city !== "" &&
      details.state !== "" &&
      details.pincode !== ""
    );
  };

  const handleFinish = () => {
    if (isFormFilled()) {
      onSubmit(details); // Pass form details to parent component
      history.push("/submit");
    }
  };

  //fetcing countries data from API
  const loadCountries = () => {
    fetch("https://api.countrystatecity.in/v1/countries", {
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDetails((prevState) => ({ ...prevState, countries: data }));
      })
      .catch((error) => console.error("Error loading countries", error));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setDetails((prevState) => ({ ...prevState, country: selectedCountry }));
    loadStates(selectedCountry);
  };

  //fetching states data accor to the country name.
  const loadStates = (countryCode) => {
    fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDetails((prevState) => ({ ...prevState, states: data }));
      })
      .catch((error) => console.error("Error loading states", error));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setDetails((prevState) => ({ ...prevState, state: selectedState }));
    loadCities(details.country, selectedState);
  };

  // fetching cities data from API
  function loadCities(countryCode, stateCode) {
    fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDetails((prevState) => ({ ...prevState, cities: data }));
      })
      .catch((error) => console.error("Error loading cities", error));
  }

  return (
    <div className="App">
      <h2>Complete Student Profile</h2>
      <hr />
      <CustomizedSteppers activeStep={activeStep} />
      <div className="personal-details-container">
        <p className="subHead">Enter your current mailing address</p>
        <div className="input-row">
          <div className="input-group1">
            <label>Address Line 1</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
            />
          </div>
          <div className="input-group1">
            <label>Address Line 2 (Optional)</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="input-row">
          <div id="inpgrop" className="input-group">
            <label>Country</label>
            <div className="select-container">
              <select name="country" onChange={handleCountryChange}>
                <option value="">Select your Country</option>
                {/* used map function to show all the data in form of array */}
                {details.countries &&
                  details.countries.map((country) => (
                    <option key={country.iso2} value={country.iso2}>
                      {country.name}
                    </option>
                  ))}
              </select>
              <KeyboardArrowDownIcon className="arrow-icon" />
            </div>
          </div>

          <div id="inpgrop" className="input-group">
            <label>State</label>
            <div className="select-container">
              <select name="state" onChange={handleStateChange}>
                <option value="">Select your State</option>
                {details.states &&
                  details.states.map((state) => (
                    <option key={state.iso2} value={state.iso2}>
                      {state.name}
                    </option>
                  ))}
              </select>
              <KeyboardArrowDownIcon className="arrow-icon" />
            </div>
          </div>

          <div id="inpgrop" className="input-group">
            <label>City</label>
            <div className="select-container">
              <select name="city" onChange={handleChange}>
                <option value="">Select your City</option>
                {details.cities &&
                  details.cities.map((city) => (
                    <option key={city.iso2} value={city.iso2}>
                      {city.name}
                    </option>
                  ))}
              </select>
              <KeyboardArrowDownIcon className="arrow-icon" />
            </div>
          </div>
        </div>
        <div className="input-row">
          <div id="zipcode" className="input-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Enter Pincode"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="save-continue-container">
        <button
          className="save-continue-btn1"
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </button>
        <button
         id="savebtn" className={`save-con-btn ${isFormFilled() ? "" : "disabled"}`}
          disabled={!isFormFilled()}
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Address;
