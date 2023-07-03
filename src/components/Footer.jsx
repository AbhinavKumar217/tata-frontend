import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <nav
        
        className="navbar navbar-expand navbar-dark bg-dark"
      >
        <div className="container-fluid">
          <div>
            <a className="navbar-brand">TATA-STEEL</a>
          </div>
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link">
              Link 1
            </NavLink>
            <NavLink to="/" className="nav-item nav-link">
              Link 2
            </NavLink>
            <NavLink to="/" className="nav-item nav-link">
              Link 3
            </NavLink>
            <NavLink to="/" className="nav-item nav-link">
              Link 4
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Footer;
