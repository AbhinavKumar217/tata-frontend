import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function UpdateStaff() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [ground_id, setGround_id] = useState(1);
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

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchStaffByID = async () => {
    const endpoint = `/staff/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setName(response.name);
      setType(response.type);
      setGround_id(response.ground_id);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchStaffByID();
  }, [id]);

  function UpdateStaffHandler() {
    const updateStaff = async () => {
      const endpoint = "/staff/update";
      const method = "POST";
      const data = {
        id: parseInt(id),
      name: name,
      type: type,
      ground_id: ground_id,
  
      };
  
      try {
        const response = await makeApiRequest(method, endpoint, data);
        navigate("/staff");
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    updateStaff();
  }

  return (
    <div className="container">
      <AlertDismissibleExample />
      <legend>Update Staff</legend>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Staff Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Staff Type"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Ground ID"
          className="mb-3"
        >
          <Form.Control
            type="number"
            value={ground_id}
            onChange={(e) => setGround_id(e.target.value)}
          />
        </FloatingLabel>

        <Button variant="outlined" type="button" onClick={UpdateStaffHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateStaff;
