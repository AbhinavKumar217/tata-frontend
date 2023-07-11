import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Dropdown } from "react-bootstrap";
import { Grid, TextField, Button, Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function AddLocation() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("State");
  const [country, setCountry] = useState("Country");
  const [show, setShow] = useState(false);
  const [states, setStates] = useState([]);

  const fetchStates = async () => {
    const endpoint = "/states/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setStates(response);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

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
      <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>

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

        <Button variant="outlined" type="button" onClick={addLocationHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddLocation;
