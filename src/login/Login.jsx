import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { login } from "../helpers/AuthWrapper";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import GlobalKeys from "../constants/Keys";

const LoginPage = () => {
  const [username, setUsername] = useState("Abhinav217");
  const [password, setPassword] = useState("Abhinav@2170");
  const [show, setShow] = useState(false);

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const userDetails = await login(username, password);
      const {
        access_token,
        user: { refresh_token },
      } = userDetails;
      Cookies.set(GlobalKeys.RefreshTokenKey, refresh_token);
      Cookies.set(GlobalKeys.AccessTokenKey, access_token);
      Cookies.set("user", JSON.stringify(userDetails.user));
      Cookies.set("loggedInStatus", true);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setShow(true);
    }
  };

  return (
    <>
    <div
        className="app-container pb-5 pl-1 pr-1"
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div
          className="background-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1380&t=st=1688619913~exp=1688620513~hmac=8bf038cfce973b8a8f16a589304c732318ce1e319988b009553e37845b7a3898")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(180deg)",
          }}
        />
      <AlertDismissibleExample />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        
        <Container maxWidth="xs">
        
          <Paper elevation={3} style={{ padding: 24 }}>
          <Typography variant="h3" align="center" gutterBottom>
          Login
        </Typography>
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
      </div>
    </>
  );
};

export default LoginPage;
