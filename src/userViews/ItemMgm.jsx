import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, TableHead } from "@mui/material";
import { useTheme } from "@emotion/react";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { Alert, AlertTitle } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { makeApiRequest } from "../helpers/ApiWrapper";

function ItemMgm() {

  const [grounds, setGrounds] = useState([])
  const [id, setId] = useState("");
  const [item, setItem] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = useState(false);
  const [itemtoDelete, setItemToDelete] = useState(0);
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

  const rows2 = []
  for (let i = 0; i < grounds.length; i++) {
    rows2[i] = grounds[i];
  }


  function dropdownClickHandle(groundid) {
    setId(groundid)
    
    const fetchItemsByGroundID = async () => {
      const endpoint = `/items/ground/${groundid}`;
      const method = "GET";
  
      try {
        const response = await makeApiRequest(method, endpoint);
        setItem(response);
      } catch (error) {
        console.error(error);
        setShow(true);
      }
    };
    fetchItemsByGroundID();
  }

  const rows = []
  for (let i = 0; i < item.length; i++) {
    rows[i] = item[i];
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

function AddItemHandler() {
  navigate("/additem")
}

function showConfirmDeletePopupHandler(id) {
  setShowModal(true);
  setItemToDelete(id);
}

function closeConfirmDeletePopupHandler() {
  setShowModal(false);
  setItemToDelete(0);
}

function deleteConfirmHandler() {

  const deleteItem = async () => {
    const endpoint = "/items/delete";
    const method = "POST";
    const data = {
      id: itemtoDelete,
    };

    try {
      const response = await makeApiRequest(method, endpoint, data);
      setItem((existingdata) => {
        return existingdata.filter((_) => _.id !== itemtoDelete);
      });
      setItemToDelete(0);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };
  deleteItem();
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
      <form>
        <div>
          <div className="text-center alert alert-info">
      <legend>Please Enter Ground Name</legend>
      </div>
        </div>
        <div className="mt-3 mb-5">
        <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Ground Name
        </Dropdown.Toggle>

        <Dropdown.Menu style={{maxHeight:"280px", overflow:"auto"}}>
          {rows2.map((row2) => (
            <Dropdown.Item key={row2.id} onClick={() => dropdownClickHandle(row2.id)}>
            {row2.name}
          </Dropdown.Item>
          ))}
        </Dropdown.Menu> 
      </Dropdown>
          </div>
        {/* <div className="mt-3 mb-5">
          <TextField className="mb-3" id="outlined-basic" value={id} onChange={handleInputChange} label="Ground ID" variant="outlined" />
          <br />
          <Button type="submit" variant="outlined">Submit</Button>
        </div> */}
      </form>
      <div className="text-center alert alert-info">
      <legend>Ground Items</legend>
      </div>
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ height: 760, minWidth: "100%" }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell align="left"><b>Item ID</b></TableCell>
            <TableCell align="left"><b>Item Name</b></TableCell>
            <TableCell align="left"><b>Item Type</b></TableCell>
            <TableCell align="left"><b>Item Sub Type</b></TableCell>
            <TableCell align="left"><b>Item Price</b></TableCell>
            <TableCell align="left"><b>Item in Ground</b></TableCell>
            <TableCell align="left"><b>Update Item</b></TableCell>
            <TableCell align="left">
                  <b>Delete</b>
                </TableCell>
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
                {row.type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.sub_type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.ground_id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
              <NavLink to={`/updateitem/${row.id}`} ><Button variant="outlined">Update Item</Button></NavLink>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => showConfirmDeletePopupHandler(row.id)}
                    >
                      Delete Item
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
    <Button className="mt-4" variant="outlined" onClick={AddItemHandler}>Add Item</Button>
    </div>
  )
}

export default ItemMgm