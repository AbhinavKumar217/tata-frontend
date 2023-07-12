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
            <span className="navbar-brand">TATA-STEEL</span>
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
