import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
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
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import DeleteConfirmation from "../components/DeleteConfirmation";

function Users() {
  const [show, setShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usertoDelete, setUserToDelete] = useState(0);
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get("https://localhost:7270/api/users/all")
      .then((response) => {
        const usersData = response.data.map((user) => {
          return {
            id: user.user_id,
            username: user.username,
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
            refreshtoken: user.refresh_token,
            expirytime: user.expiry_time,
            locationid: user.location_id,
            role: user.role,
          };
        });
        setUsers(usersData);
      })
      .catch((error) => {
        setShow(true);
      });
  }, []);

  const rows = [];
  for (let i = 0; i < users.length; i++) {
    rows[i] = users[i];
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

  function AddUserHandler() {
    navigate("/adduser");
  }

  console.log(rows);

  function showConfirmDeletePopupHandler(id) {
    setShowModal(true);
    setUserToDelete(id);
  }

  function closeConfirmDeletePopupHandler() {
    setShowModal(false);
    setUserToDelete(0);
  }

  function deleteConfirmHandler() {
    var body = {
      user_id: usertoDelete,
    };

    axios
      .post(`https://localhost:7270/api/users/delete`, body)
      .then((response) => {
        setUsers((existingdata) => {
          return existingdata.filter((_) => _.id !== usertoDelete);
        });
        setUserToDelete(0);
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        setShow(true);
        console.log(body)
      });
  }

  return (
    <div>
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
          <h2>Users Database</h2>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}
        sx={{ opacity: "85%" }}
        >
          <Table
            sx={{ height: 760, minWidth: "100%" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>User ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>User Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>First Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Last Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Role</b>
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
                    {row.username}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.firstname}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.lastname}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.role.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <NavLink
                      to={`/updateuser/${row.id}`}
                      className="nav-item nav-link"
                    >
                      <Button variant="outlined">Update User</Button>
                    </NavLink>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => showConfirmDeletePopupHandler(row.id)}
                    >
                      Delete User
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
                  colSpan={4}
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
      <Button className="mt-4" variant="outlined" onClick={AddUserHandler}>
        Add User
      </Button>
    </div>
  );
}

export default Users;
