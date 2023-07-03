import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Dropdown } from "react-bootstrap";
import { Button, Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function AddLocation() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("State");
  const [country, setCountry] = useState("Country");
  const [show, setShow] = useState(false);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const countries = ["India", "Pittsburgh", "Austria", "Vienna", "Egypt"];

  function AlertDismissibleExample() {
    if (show) {
      return (
        <Alert severity="error" onClose={() => setShow(false)} dismissible>
          <AlertTitle>Error</AlertTitle>
          <p>Request cannot be processed</p>
        </Alert>
      );
    }
  }

  const navigate = useNavigate();

  function dropdownStateHandle(states) {
    setState(states);
  }

  function dropdownCountryHandle(countries) {
    setCountry(countries);
  }

  console.log(state);
  console.log(country);

  function addLocationHandler() {
    const addLocation = async () => {
      const endpoint = "/location/add";
      const method = "POST";
      const data = {
        name: name,
        city: city,
        state: state,
        country: country,
      };

      try {
        const response = await makeApiRequest(method, endpoint, data);
        navigate("/locations");
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    addLocation();
  }

  return (
    <>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
        <legend>Add new Location</legend>
      </div>
      <Form>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="City"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FloatingLabel>

        {/* <FloatingLabel controlId="floatingInput" label="state" className="mb-3">
          <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </FloatingLabel> */}

        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {state}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
              {states.map((states) => (
                <Dropdown.Item
                  key={states}
                  onClick={() => dropdownStateHandle(states)}
                >
                  {states}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {country}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
              {countries.map((countries) => (
                <Dropdown.Item
                  key={countries}
                  onClick={() => dropdownCountryHandle(countries)}
                >
                  {countries}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* <FloatingLabel
          controlId="floatingInput"
          label="country"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FloatingLabel> */}

        <Button variant="outlined" type="button" onClick={addLocationHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddLocation;
