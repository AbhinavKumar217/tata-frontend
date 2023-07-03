import { makeApiRequest, makeGetRequest } from "../helpers/ApiWrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Button } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

function AddGround() {
  const [name, setName] = useState(" Ground Name ");
  const [location_id, setLocation_id] = useState();
  const [items, setItems] = useState([]);
  const [staff, setStaff] = useState([]);
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location_name, setLocation_name] = useState("Location Name");

  const fetchLocations = async () => {
    const endpoint = "/location/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const locationsData = response.map((location) => {
        return {
          id: location.id,
          name: location.name,
          city: location.city,
          state: location.state,
          country: location.country,
        };
      });
      setLocations(locationsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [location_id]);

  const rows = [];
  for (let i = 0; i < locations.length; i++) {
    rows[i] = locations[i];
  }

  console.log(rows);

  function dropdownLocationHandle(locid, locname) {
    setLocation_id(locid);
    setLocation_name(locname);
  }

  console.log(location_id);

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

  function addGroundHandler() {
    const addGround = async () => {
      const endpoint = "/grounds/add";
      const method = "POST";
      const data = {
        name: name,
        location_id: location_id,
        items: items.map(Number),
        staff: staff.map(Number),
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
    addGround();
  }

  return (
    <div>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
        <legend>Add new Ground</legend>
      </div>
      <Form>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Ground Name"
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
          label="Required Items [eg:1,2,3]"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value.split(",").map(Number))}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Request Staff [eg:1,2,3]"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={staff}
            onChange={(e) => setStaff(e.target.value.split(",").map(Number))}
          />
        </FloatingLabel>
        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {location_name}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
              {rows.map((row) => (
                <Dropdown.Item
                  key={row.id}
                  onClick={() => dropdownLocationHandle(row.id, row.name)}
                >
                  {row.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Button type="button" variant="outlined" onClick={addGroundHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddGround;
