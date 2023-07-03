import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function UpdateItem() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sub_type, setSub_type] = useState("");
  const [price, setPrice] = useState(1);
  const [ground_id, setGround_id] = useState(100.0);
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

  const fetchItemByID = async () => {
    const endpoint = `/items/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setName(response.name);
      setType(response.type);
      setSub_type(response.sub_type);
      setPrice(response.price);
      setGround_id(response.ground_id);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchItemByID();
  }, [id]);

  function UpdateItemHandler() {

    const updateItem = async () => {
      const endpoint = "/items/update";
      const method = "POST";
      const data = {
        id: parseInt(id),
      name: name,
      type: type,
      sub_type: sub_type,
      price: parseInt(price),
      ground_id: parseInt(ground_id),
  
      };
  
      try {
        const response = await makeApiRequest(method, endpoint, data);
        navigate("/item");
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    updateItem();

  }

  return (
    <div>
      <AlertDismissibleExample />
      <legend>Update Item {id}</legend>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Item Name"
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
          label="Item Type"
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
          label="Item Sub-Type"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={sub_type}
            onChange={(e) => setSub_type(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Item Price"
          className="mb-3"
        >
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Item on Ground"
          className="mb-3"
        >
          <Form.Control
            type="number"
            value={ground_id}
            onChange={(e) => setGround_id(e.target.value)}
          />
        </FloatingLabel>

        <Button variant="outlined" type="button" onClick={UpdateItemHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateItem;
