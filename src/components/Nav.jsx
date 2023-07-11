import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import CategoryIcon from "@mui/icons-material/Category";
import Cookies from "js-cookie";
import { logout } from "../helpers/AuthWrapper";
import GlobalKeys from "../constants/Keys";

function Nav() {
  const navigate = useNavigate();

  function logoutHandle() {
    logout();
  }

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          <>
            <ListItem className="text-center">
              <a className="navbar-brand text-center">TATA-STEEL</a>
            </ListItem>
            <Divider />
            <ListItem>
              <NavLink to="/locations">
                <ListItemButton>
                  <ListItemIcon>
                    <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText>Locations</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem>
              <NavLink to="/grounds">
                <ListItemButton>
                  <ListItemIcon>
                    <SportsSoccerIcon />
                  </ListItemIcon>
                  <ListItemText>Grounds</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/addreq">
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText>Add Request</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        }
      </List>
      <List>
        {
          <>
            <ListItem>
              <NavLink to="/staff">
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>Staff</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/item">
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText>Item</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/approvereq">
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText>Approve Request</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        }
      </List>
    </Box>
  );

  return (
    <>
    <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: "#d1ecf1", borderRadius: "5px", borderColor: "#bee5eb", opacity: "70%"}}>
      <div className="container-fluid">
        <div>
          <a className="navbar-brand"><b>TATA-STEEL</b></a>
          <span>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button variant="outlined" onClick={toggleDrawer(anchor, true)}>MENU</Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </span>
        </div>
        <div className="navbar-nav">
          <NavLink to="/" className="nav-item nav-link">
            <Button variant="outlined">Home</Button>
          </NavLink>
          <NavLink to="/login" className="nav-item nav-link">
            <Button variant="outlined" onClick={() => logoutHandle()}>Logout</Button>
          </NavLink>
        </div>
      </div>
    </nav>
  </>
  );
}

export default Nav;
