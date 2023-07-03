import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import GlobalKeys from "../constants/Keys";

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user"));
    console.log(user.access_token);
    if (user.access_token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [authenticated]);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
