import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function UpdateGround() {

  const [name, setName] = useState("");
  const [location_id, setLocation_id] = useState(1);
  const [show, setShow] = useState(false)

  function AlertDismissibleExample() {
    if (show) {
      return (
        <Alert severity="error" onClose={() => setShow(false)} dismissible>
          <AlertTitle>Error</AlertTitle>
          <p>
            Request cannot be processed
          </p>
        </Alert>
      );
    }
  }

  const { id } = useParams()
  const navigate = useNavigate()

  const fetchGroundByID = async () => {
    const endpoint = `/grounds/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setName(response.name);
      setLocation_id(response.location_id);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchGroundByID();
  }, [id]);

  function UpdateGroundHandler() {
    const updateGround = async () => {
      const endpoint = "/grounds/update";
      const method = "POST";
      const data = {
        id:id,
        name: name,
        location_id: location_id,
  
      };
  
      try {
        const response = await makeApiRequest(method, endpoint, data);
        navigate("/grounds");
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    updateGround();
  }

  return <div className="container">
    <AlertDismissibleExample />
    <div className="text-center alert alert-info">
      <legend>Update Ground {id}</legend>
      </div>
      <Form>
        <FloatingLabel controlId="floatingInput" label="Ground Name" className="mb-3">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Location ID" className="mb-3">
          <Form.Control
            type="number"
            value={location_id}
            onChange={(e) => setLocation_id(e.target.value)}
          />
        </FloatingLabel>

        <Button variant="outlined" type="button" onClick={UpdateGroundHandler}>
          Submit
        </Button>
      </Form>
  </div>;
}

export default UpdateGround;
