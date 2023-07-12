import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import GlobalKeys from "../constants/Keys";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const authenticated = user != null;
  const isAdmin = user?.role?.name === "SUPERADMIN";
  console.log(user);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/");
    }
  }, []);

  return authenticated && isAdmin ? children : <Navigate to="/unauthorized" />;
}

export default AdminRoute;
