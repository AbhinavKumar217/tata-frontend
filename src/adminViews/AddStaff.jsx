import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Button } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function AddStaff() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Staff Type");
  const [ground_id, setGround_id] = useState("");
  const [ground_name, setGround_name] = useState("Ground Name")
  const [show, setShow] = useState(false);
  const [grounds, setGrounds] = useState([]);

  const fetchGrounds = async () => {
    const endpoint = "/grounds/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const groundsData = response.map((ground) => {
        return {
          id: ground.id,
          name: ground.name,
          location_id: ground.location_id,
          location_name: ground.location.name,
          items: ground.items,
        };
      });
      console.log(groundsData);
      setGrounds(groundsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const rows2 = [];
  for (let i = 0; i < grounds.length; i++) {
    rows2[i] = grounds[i];
  }

  const stafftype = ["WORKER", "CLERK", "MANAGER"];

  function dropdownGroundIdHandle(id, name) {
    setGround_id(id);
    setGround_name(name);
  }

  function dropdownReqTypeHandle(type) {
    setType(type);
  }

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

  function addStaffHandler() {
    const addStaff = async () => {
      const endpoint = "/staff/add";
      const method = "POST";
      const data = {
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
    addStaff();
  }

  return (
    <div>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
        <legend>Add new Staff</legend>
      </div>
      <Form>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
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
        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {type}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight:"280px", overflow:"auto"}}>
              {stafftype.map((stafftype) => (
                <Dropdown.Item
                  key={stafftype}
                  onClick={() => dropdownReqTypeHandle(stafftype)}
                >
                  {stafftype}
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
              {ground_name}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight:"280px", overflow:"auto"}}>
              {rows2.map((row) => (
                <Dropdown.Item
                  key={row.id}
                  onClick={() => dropdownGroundIdHandle(row.id, row.name)}
                >
                  {row.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Button type="button" variant="outlined" onClick={addStaffHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddStaff;
