import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Button, Divider } from "@mui/material";
import { Table, Dropdown } from "react-bootstrap";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function StaffMgm() {
  const [id, setId] = useState();
  const [name, setName] = useState("Staff Name");
  const [staff, setStaff] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stafftoDelete, setStaffToDelete] = useState(0);
  const [show, setShow] = useState(false);

  const fetchStaff = async () => {
    const endpoint = "/staff/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const staffData = response.map((staff) => {
        return {
          id: staff.id,
          name: staff.name,
          ground_id: staff.ground_id,
        };
      });
      setStaffs(staffData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const rows = [];
  for (let i = 0; i < staffs.length; i++) {
    rows[i] = staffs[i];
  }

  async function dropdownStaffHandle(id, name) {
    setId(id);
    setName(name);

    const endpoint = `/staff/${id}`;
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      setStaff(response);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
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

  function showConfirmDeletePopupHandler(id) {
    setShowModal(true);
    setStaffToDelete(id);
  }

  function closeConfirmDeletePopupHandler() {
    setShowModal(false);
    setStaffToDelete(0);
  }

  function deleteConfirmHandler() {

    const deleteStaff = async () => {
      const endpoint = "/staff/delete";
      const method = "POST";
      const data = {
        id: stafftoDelete,
      };

      try {
        const response = await makeApiRequest(method, endpoint, data);
        setStaffToDelete(0);
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setShow(true);
      }
    };
    deleteStaff();
  }

  return (
    <div className="container">
      <AlertDismissibleExample />
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation!"
        body="Do you really want to delete the employee data?"
        closeConfirmDeletePopupHandler={closeConfirmDeletePopupHandler}
        deleteConfirmHandler={deleteConfirmHandler}
      />
      <Divider />
      <div className="mb-5">
        <div className="text-center alert alert-info">
          <legend>Search Staff by Name</legend>
        </div>
        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {name}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
            {rows.map((row) => (
              <Dropdown.Item
                key={row.id}
                onClick={() => dropdownStaffHandle(row.id, row.name)}
              >
                {row.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Divider />
      <div className="text-center alert alert-info">
        <legend>Staff Details</legend>
      </div>
      <div className="mt-3 mb-5">
        <Table striped bordered border="2" hover variant="light">
          <thead>
            <tr>
              <td>
                <b>ID</b> : {staff.id}
              </td>
              <td>
                <b>Name</b> : {staff.name}
              </td>
              <td>
                <b>Role</b> : {staff.type}
              </td>
              <td>
                <b>Ground</b> : {staff.ground_id}
              </td>
            </tr>
          </thead>
        </Table>
        <NavLink to={`/updatestaff/${staff.id}`}>
          <Button className="mt-3 mr-5" type="submit" variant="outlined">
            Edit
          </Button>
        </NavLink>
        <Button
          className="mt-3"
          type="submit"
          variant="outlined"
          onClick={() => showConfirmDeletePopupHandler(staff.id)}
        >
          Delete
        </Button>
      </div>
      <Divider />
      <div className="mt-5 mb-5">
        <div className="text-center alert alert-info">
          <legend>Add new Staff</legend>
        </div>
        <NavLink to={"/addstaff"}>
          <Button className="ml-4" variant="outlined">
            Add Staff
          </Button>
        </NavLink>
      </div>
      <Divider />
    </div>
  );
}

export default StaffMgm;
