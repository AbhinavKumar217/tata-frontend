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

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const authenticated = user != null;
  console.log(user);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, []);

  return authenticated ? children : "";
}

export default ProtectedRoute;
