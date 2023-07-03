import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Button, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, TableHead, Divider } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import DeleteConfirmation from "../components/DeleteConfirmation";
import { Alert, AlertTitle } from "@mui/material";
import { makeApiRequest } from "../helpers/ApiWrapper";

function Locations() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [locationtoDelete, setLocationToDelete] = useState(0);
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

  const navigate = useNavigate()

  function AddLocationHandler() {
    navigate("/addlocation")
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
      console.log(locationsData);
      setLocations(locationsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const rows = []
  for (let i = 0; i < locations.length; i++) {
    rows[i] = locations[i];
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
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

function showConfirmDeletePopupHandler(id) {
  setShowModal(true);
  setLocationToDelete(id);
}

function closeConfirmDeletePopupHandler() {
  setShowModal(false);
  setLocationToDelete(0);
}

function deleteConfirmHandler() {
  const deleteLocation = async () => {
    const endpoint = "/location/delete";
    const method = "POST";
    const data = {
      id: locationtoDelete,
    };

    try {
      const response = await makeApiRequest(method, endpoint, data);
      setLocations((existingdata) => {
        return existingdata.filter((_) => _.id !== locationtoDelete);
      });
      setLocationToDelete(0);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };
  deleteLocation();
}

  return (
    <div className="container">
      <AlertDismissibleExample />
      <Divider className="mt-4 mb-4" />
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation!"
        body="Do you really want to delete the employee data?"
        closeConfirmDeletePopupHandler={closeConfirmDeletePopupHandler}
        deleteConfirmHandler={deleteConfirmHandler}
      />
    <div className="text-center pt-3 pb-5">
         <div className="text-center alert alert-info">
      <legend>Locations Database</legend>
      </div>
    </div>
    <Divider className="mb-5" />
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ height: 760, minWidth: "100%" }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell align="left"><b>Location ID</b></TableCell>
            <TableCell align="left"><b>Location Name</b></TableCell>
            <TableCell align="left"><b>City</b></TableCell>
            <TableCell align="left"><b>State</b></TableCell>
            <TableCell align="left"><b>Country</b></TableCell>
            <TableCell align="left"><b>Update</b></TableCell>
            <TableCell align="left"><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 160 }} align="left">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.city}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.state}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.country}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
              <NavLink to={`/updatelocation/${row.id}`} className="nav-item nav-link"><Button variant="outlined">Update Location</Button></NavLink>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => showConfirmDeletePopupHandler(row.id)}
                    >
                      Delete Location
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
              rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
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
    <Divider className="mt-5 mb-2" />
    <Button className="mt-4" variant="outlined" onClick={AddLocationHandler}>Add Location</Button>
    </div>
  );
}

export default Locations;
