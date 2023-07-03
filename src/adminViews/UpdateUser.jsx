import React, { useState, useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

function UpdateUser() {
  const [username, setUsername] = useState(" User Name ");
  const [firstname, setFirstname] = useState(" First Name ");
  const [lastname, setLastname] = useState(" Last Name ");
  const [email, setEmail] = useState(" Email ");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(" Role ");
  const [location_id, setLocation_id] = useState(0);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    axios.get(`https://localhost:7270/api/users/${id}`).then((response) => {
      setUsername(response.data.username);
      setFirstname(response.data.first_name);
      setLastname(response.data.last_name);
      setEmail(response.data.email);
      setLocation_id(response.data.location_id);
    })
    .catch((error) => {
      setShow(true)
    })
  }, [id]);

  function UpdateUserHandler() {
    var body = {
      user_id: parseInt(id),
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      role: role,
      location_id: location_id,
    };

    var payload = {
      to: email,
      subject: "TATA Grounds Booking",
      body: "Your account details have been updated successfully. You may contact us for further support at this number : 8084094926",
    };

    axios
      .post("https://localhost:7270/api/users/edit", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        axios
          .post("https://localhost:7093/api/Email", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setShow(true)
          });
      })
      .catch((error) => {
        setShow(true)
        console.log(body);
      });
  }

  return (
    <div><AlertDismissibleExample />
    <div className="text-center alert alert-info">
      <legend>Update User {firstname}</legend>
      </div>
      <Form>
        <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3">
          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Role" className="mb-3">
          <Form.Control
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Location ID" className="mb-3">
          <Form.Control
            type="number"
            value={location_id}
            onChange={(e) => setLocation_id(e.target.value)}
          />
        </FloatingLabel>

        <Button variant="outlined" type="button" onClick={UpdateUserHandler}>
          Submit
        </Button>
      </Form>
      </div>
  )
}

export default UpdateUser