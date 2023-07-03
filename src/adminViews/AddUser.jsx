import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Button } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

function AddUser() {
  const [username, setUsername] = useState(" User Name ");
  const [firstname, setFirstname] = useState(" First Name ");
  const [lastname, setLastname] = useState(" Last Name ");
  const [email, setEmail] = useState(" Email ");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(" Role ");
  const [location_id, setLocation_id] = useState();
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location_name, setLocation_name] = useState("Location Name");

  useEffect(() => {
    axios.get("https://localhost:7270/api/location/all").then((response) => {
      setLocations(response.data);
    })
    .catch((error) => {
      setShow(true)
    })
  }, []);

  const rows = []
  for (let i = 0; i < locations.length; i++) {
    rows[i] = locations[i];
  }

  function dropdownLocationHandle(locid, locname) {
    setLocation_id(locid)
    setLocation_name(locname)
  }

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

  const navigate = useNavigate();

  function addUserHandler() {
    var body = {
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
      body: "Your account has been created successfully and added to our database.",
    };

    console.log(body);

    axios
      .post("https://localhost:7270/api/users/add", body, {
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
          });
      })
      .catch((error) => {
        setShow(true)
      });
  }

  return (
    <div>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
      <legend>Add new User</legend>
      </div>
      <Form>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="User Name"
          className="mb-3"
        >
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="First Name"
          className="mb-3"
        >
          <Form.Control type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="Last Name"
          className="mb-3"
        >
          <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="Email"
          className="mb-3"
        >
          <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="Password"
          className="mb-3"
        >
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel style={{maxWidth:"40%"}}
          controlId="floatingInput"
          label="Role"
          className="mb-3"
        >
          <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </FloatingLabel>
        <div className="mb-5">
        <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          {location_name}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{maxHeight:"280px", overflow:"auto"}}>
          {rows.map((row) => (
            <Dropdown.Item key={row.id} onClick={() => dropdownLocationHandle(row.id, row.name)}>
            {row.name}
          </Dropdown.Item>
          ))}
        </Dropdown.Menu> 
      </Dropdown>
          </div>
        <Button type="button" variant="outlined" onClick={addUserHandler}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddUser