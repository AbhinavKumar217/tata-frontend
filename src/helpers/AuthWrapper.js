import axios from "axios";
import Cookies from "js-cookie";
import GlobalKeys from "../constants/Keys";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "https://localhost:7270/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const userDetails = response.data;
    return userDetails;
  } catch (error) {
    throw error;
  }
};

export const exchangeToken = async () => {
  try {
    const access_token = Cookies.get(GlobalKeys.AccessTokenKey);
    const refresh_token = Cookies.get(GlobalKeys.RefreshTokenKey);

    console.log(access_token);
    console.log(refresh_token);
    const response = await api.post("/refresh-token", {
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const { access_token: new_access_token } = response.data;
    console.log(new_access_token);

    // Return the new access token
    return new_access_token;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  try {
    Cookies.set(GlobalKeys.AccessTokenKey, null);
    Cookies.set(GlobalKeys.RefreshTokenKey, null);
    Cookies.set("user", null);
    Cookies.set("loggedInStatus", false);
  } catch (error) {
    throw error;
  }
};
