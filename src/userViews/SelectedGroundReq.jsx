import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Add as AddIcon } from "@mui/icons-material";

function SelectedGroundReq() {
    const { id } = useParams();

  const [requesterName, setRequesterName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [requesterMobileNo, setRequesterMobileNo] = useState("");
  const [requesterType, setRequesterType] = useState("Request Type");
  const [bookingStart, setBookingStart] = useState("2023-06-28T12:00:00");
  const [bookingEnd, setBookingEnd] = useState("2023-07-21T12:00:00");
  const [requestedItems, setRequestedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [grounds, setGrounds] = useState([]);
  const [groundName, setGroundName] = useState();

  const items = [
    { id: 1, name: "Tent" },
    { id: 2, name: "Roller" },
    { id: 3, name: "speaker" },
    { id: 4, name: "pavilion" },
  ];

  
  const navigate = useNavigate();

  const addItemToRequestedItems = (item) => {
    setRequestedItems((prevItems) => [...prevItems, item]);
  };

  const fetchGrounds = async () => {
    const endpoint = `/grounds/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setGrounds(response);
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
        ground_id: id,
        requested_items: requestedItems,
      };

      try {
        console.log(data);
        const response = await makeApiRequest(method, endpoint, data);
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
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Requester"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
          />
        </Grid>
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Email ID"
            value={requesterEmail}
            onChange={(e) => setRequesterEmail(e.target.value)}
          />
        </Grid>
        <Grid className="mb-5" item xs={12} sm={6}>
          <TextField
            sx={{ minWidth: "35%" }}
            label="Mobile No"
            value={requesterMobileNo}
            onChange={(e) => setRequesterMobileNo(e.target.value)}
          />
        </Grid>
        <FloatingLabel
          style={{ maxWidth: "36.5%" }}
          controlId="floatingInput"
          label="Items Required"
          className="mb-3"
        >
          <div className="d-flex align-items-center">
            {items.map((item) => (
              <Button
                onClick={() => addItemToRequestedItems(item.id)}
                key={item.id}
                variant="outlined"
                sx={{ marginRight: "20px" }}
              >
                Add {item.name}
              </Button>
            ))}
          </div>
        </FloatingLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ minWidth: "35%" }}
            label="From"
            className="mb-5"
            value={dayjs(bookingStart)}
            onChange={(date) =>
              setBookingStart(date.format("YYYY-MM-DDTHH:mm:ss"))
            }
            renderInput={(props) => (
              <FloatingLabel controlId="floatingInput" label="From">
                <Form.Control {...props} />
              </FloatingLabel>
            )}
          />
        </LocalizationProvider>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ minWidth: "35%" }}
            className="mb-5"
            label="From"
            value={dayjs(bookingEnd)}
            onChange={(date) =>
              setBookingEnd(date.format("YYYY-MM-DDTHH:mm:ss"))
            }
            renderInput={(props) => (
              <FloatingLabel
                controlId="floatingInput"
                label="From"
                className="mb-5"
              >
                <Form.Control {...props} />
              </FloatingLabel>
            )}
          />
        </LocalizationProvider>
        <div className="mb-5">
          <Dropdown data-bs-theme="dark" >
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              style={{minWidth:"35%"}}
            >
              {requesterType}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto", minWidth:"35%" }}>
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
              style={{minWidth:"35%"}}
            >
              {grounds.name}
            </Dropdown.Toggle>
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

export default SelectedGroundReq;
