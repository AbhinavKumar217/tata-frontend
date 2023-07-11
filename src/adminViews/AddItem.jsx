import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Grid, TextField, Button, Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function AddItem() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sub_type, setSub_type] = useState("");
  const [price, setPrice] = useState();
  const [ground_id, setGround_id] = useState();
  const [ground_name, setGround_name] = useState("Ground Name");
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

  function dropdownGroundIdHandle(id, name) {
    setGround_id(id);
    setGround_name(name);
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

  function addItemHandler() {
    const addItem = async () => {
      const endpoint = "/items/add";
      const method = "POST";
      const data = {
        name: name,
        type: type,
        sub_type: sub_type,
        price: parseInt(price),
        ground_id: ground_id,
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
    addItem();
  }

  return (
    <div>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
        <legend>Add new Item</legend>
      </div>
      <Form>
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Item Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
    
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Item Sub-Type"
            value={sub_type}
            onChange={(e) => setSub_type(e.target.value)}
          />
        </Grid>
        
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            type="number"
            sx={{ minWidth: "35%" }}
            label="Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        
        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {ground_name}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
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
        <Button type="button" variant="outlined" onClick={addItemHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddItem;
