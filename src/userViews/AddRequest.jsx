import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Button, Divider } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function AddRequest() {
  const [requesterName, setRequesterName] = useState("FName LName");
  const [requesterEmail, setRequesterEmail] = useState(
    "example123@example.com"
  );
  const [requesterMobileNo, setRequesterMobileNo] = useState("1234554321");
  const [requesterType, setRequesterType] = useState("Request Type");
  const [bookingStart, setBookingStart] = useState("2023-06-28T12:00:00");
  const [bookingEnd, setBookingEnd] = useState("2023-07-21T12:00:00");
  const [groundId, setGroundId] = useState(1);
  const [requestedItems, setRequestedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [grounds, setGrounds] = useState([]);
  const [groundName, setGroundName] = useState("Ground Name");

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

  const reqtype = ["Individual", "Group", "High Profile", "Non Employee"];

  function dropdownGroundIdHandle(id, name) {
    setGroundId(id);
    setGroundName(name);
  }

  function dropdownReqTypeHandle(rt) {
    setRequesterType(rt);
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

  function addRequestHandler() {

    var payload = {
      to: requesterEmail,
      subject: "TATA Grounds Booking",
      body: "Your booking has been added to our database.",
    };

    const addRequest = async () => {
      const endpoint = "/booking/add";
      const method = "POST";
      const data = {
        requester_name: requesterName,
      requester_email: requesterEmail,
      requester_mobile_no: requesterMobileNo,
      requester_type: requesterType,
      booking_start: bookingStart,
      booking_end: bookingEnd,
      ground_id: groundId,
      requested_items: requestedItems,
      };

      try {
        const response = await makeApiRequest(method, endpoint, data);
        axios
          .post("https://localhost:7093/api/Email", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            navigate("/approvereq");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    addRequest();
  }

  return (
    <div>
      <AlertDismissibleExample />
      <div className="text-center alert alert-info">
        <legend>Add a new Request</legend>
      </div>
      <Divider className="mb-5 mt-4" />
      <Form>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Requester"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Email ID"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={requesterEmail}
            onChange={(e) => setRequesterEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Mobile No"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={requesterMobileNo}
            onChange={(e) => setRequesterMobileNo(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Items Required [eg: 1,2,3]"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={requestedItems}
            onChange={(e) => setRequestedItems(e.target.value.split(","))}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="From"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={bookingStart}
            onChange={(e) => setBookingStart(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          style={{ maxWidth: "40%" }}
          controlId="floatingInput"
          label="Till"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={bookingEnd}
            onChange={(e) => setBookingEnd(e.target.value)}
          />
        </FloatingLabel>
        <div className="mb-5">
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {requesterType}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight:"280px", overflow:"auto"}}>
              {reqtype.map((reqtype) => (
                <Dropdown.Item
                  key={reqtype}
                  onClick={() => dropdownReqTypeHandle(reqtype)}
                >
                  {reqtype}
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
              {groundName}
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
        <Divider className="mb-4 mt-5" />
        <Button type="button" variant="outlined" onClick={addRequestHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddRequest;
