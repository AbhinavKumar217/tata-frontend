import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function UpdateLocation() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(false);

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

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchLocationByID = async () => {
    const endpoint = `/location/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setName(response.name);
      setCity(response.city);
      setState(response.state);
      setCountry(response.country);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchLocationByID();
  }, [id]);

  function UpdateLocationHandler() {
    const updateLocation = async () => {
      const endpoint = "/location/update";
      const method = "POST";
      const data = {
        id:id,
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

    updateLocation();
  }

  return (
    <div className="container">
      <AlertDismissibleExample />
      <legend>Update Location {id}</legend>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Location Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="City" className="mb-3">
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="State" className="mb-3">
          <Form.Control
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Country"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FloatingLabel>

        <Button
          variant="outlined"
          type="button"
          onClick={UpdateLocationHandler}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateLocation;
