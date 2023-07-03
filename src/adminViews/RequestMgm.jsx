import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { makeApiRequest } from "../helpers/ApiWrapper";

function RequestMgm() {
  const [request, setRequest] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = useState(false);
  const [bookingtoDelete, setBookingToDelete] = useState(0);
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

  const fetchBookings = async () => {
    const endpoint = "/booking/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const bookingsData = response.map((booking) => {
        return {
          id: booking.id,
          requester_name: booking.requester_name,
          requester_email: booking.requester_email,
          requester_mobile_no: booking.requester_mobile_no,
          requester_type: booking.requester_type,
          booking_start: booking.booking_start,
          booking_end: booking.booking_end,
          ground_id: booking.ground_id,
          confirmed: booking.confirmed,
        };
      });
      console.log(bookingsData);
      setRequest(bookingsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  console.log(request);

  const rows = [];
  for (let i = 0; i < request.length; i++) {
    rows[i] = request[i];
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

  function approveHandler(id, email) {

    var payload = {
      to: email,
      subject: "TATA Grounds Booking",
      body: "Your booking has been approved by the admin. You may contact us for further support at this number : 8084094926",
    };

    const approveBooking = async () => {
      const endpoint = "/booking/approve";
      const method = "POST";
      const data = {
        id:id,
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
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            setShow(true)
          });
      } catch (error) {
        console.error(error);
        setShow(true);
        console.log(data);
      }
    };
    approveBooking();
  }

  function showConfirmDeletePopupHandler(id) {
    setShowModal(true);
    setBookingToDelete(id);
  }

  function closeConfirmDeletePopupHandler() {
    setShowModal(false);
    setBookingToDelete(0);
  }

  function deleteConfirmHandler() {

    const deleteBooking = async () => {
      const endpoint = "/booking/delete";
      const method = "POST";
      const data = {
        id: bookingtoDelete,
      };

      try {
        const response = await makeApiRequest(method, endpoint, data);
        setRequest((existingdata) => {
          return existingdata.filter((_) => _.id !== bookingtoDelete);
        });
        setBookingToDelete(0);
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setShow(true);
      }
    };
    deleteBooking();
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
      <div className="text-center alert alert-info">
      <legend>Booking Requests</legend>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ height: 760, minWidth: "150%" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Booking ID</b>
                </TableCell>
                <TableCell align="left">
                  <b>Requester Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Requester Email</b>
                </TableCell>
                <TableCell align="left">
                  <b>Requester Mobile Number</b>
                </TableCell>
                <TableCell align="left">
                  <b>Requester Type</b>
                </TableCell>
                <TableCell align="left">
                  <b>Booking Start</b>
                </TableCell>
                <TableCell align="left">
                  <b>Booking End</b>
                </TableCell>
                <TableCell align="left">
                  <b>Ground ID</b>
                </TableCell>
                <TableCell align="left">
                  <b>Confirmed</b>
                </TableCell>
                <TableCell align="left">
                  <b>Approve</b>
                </TableCell>
                <TableCell align="left">
                  <b>Reject</b>
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
                  <TableCell style={{ width: 160 }} align="left">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.requester_name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.requester_email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.requester_mobile_no}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.requester_type}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.booking_start}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.booking_end}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.ground_id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.confirmed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                      <Button type="button" variant="outlined" onClick={() => approveHandler(row.id, row.requester_email)} >Approve</Button>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => showConfirmDeletePopupHandler(row.id)}
                    >
                      Reject
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
    </div>
  );
}

export default RequestMgm;
