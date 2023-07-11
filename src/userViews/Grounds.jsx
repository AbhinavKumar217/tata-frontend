import { makeApiRequest } from "../helpers/ApiWrapper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { Alert, AlertTitle } from "@mui/material";
import { Dropdown } from "react-bootstrap";

function Grounds() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [grounds, setGrounds] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [groundtoDelete, setGroundToDelete] = useState(0);
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("Location Name");

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

  const rows = [];
  for (let i = 0; i < grounds.length; i++) {
    rows[i] = grounds[i];
  }

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function AddGroundHandler() {
    navigate("/addground");
  }

  function showConfirmDeletePopupHandler(id) {
    setShowModal(true);
    setGroundToDelete(id);
  }

  function closeConfirmDeletePopupHandler() {
    setShowModal(false);
    setGroundToDelete(0);
  }

  function deleteConfirmHandler() {

    const deleteGround = async () => {
      const endpoint = "/grounds/delete";
      const method = "POST";
      const data = {
        id: groundtoDelete,
      };

      try {
        const response = await makeApiRequest(method, endpoint, data);
        setGrounds((existingdata) => {
          return existingdata.filter((_) => _.id !== groundtoDelete);
        });
        setGroundToDelete(0);
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setShow(true);
      }
    };
    deleteGround();

  }

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
  }, [locationId]);

  const rows2 = [];
  for (let i = 0; i < locations.length; i++) {
    rows2[i] = locations[i];
  }

  function dropdownClickHandle(locationid, locationname) {
    setLocationId(locationid);
    setLocationName(locationname);

    const fetchGroundsByLocationID = async () => {
      const endpoint = `/grounds/location/${locationid}`;
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
        setGrounds(groundsData);
      } catch (error) {
        console.error(error);
        setShow(true);
      }
    };
    fetchGroundsByLocationID();
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
      <div className="text-center pt-3 pb-3">
        <div className="text-center alert alert-info">
          <h2>Grounds Database</h2>
        </div>
      </div>
      <div className="mb-5">
        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {locationName}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: "280px", overflow: "auto" }}>
            {rows2.map((row2) => (
              <Dropdown.Item
                key={row2.id}
                onClick={() => dropdownClickHandle(row2.id, row2.name)}
              >
                {row2.name}
              </Dropdown.Item>
            ))}
            <Dropdown.Item onClick={() => window.location.reload()}>
              ALL
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <TableContainer sx={{ opacity: "85%" }} component={Paper}>
          <Table
            sx={{ height: 760, minWidth: "100%" }}
            aria-label="custom pagination table"
          >
            <TableHead sx={{ backgroundColor: "#d1ecf1", borderRadius: "5px", borderColor: "#bee5eb" }}>
              <TableRow>
                <TableCell align="center">
                  <b>Ground ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ground Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Location Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Items</b>
                </TableCell>
                <TableCell align="center">
                  <b>Update</b>
                </TableCell>
                <TableCell align="center">
                  <b>Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.location_name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    <div>
                      {row.items.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <NavLink
                      to={`/updateground/${row.id}`}
                      className="nav-item nav-link"
                    >
                      <Button variant="outlined">Update Ground</Button>
                    </NavLink>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => showConfirmDeletePopupHandler(row.id)}
                    >
                      Delete Ground
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <Button className="mt-4" variant="outlined" onClick={AddGroundHandler}>
        Add Ground
      </Button>
    </div>
  );
}

export default Grounds;
