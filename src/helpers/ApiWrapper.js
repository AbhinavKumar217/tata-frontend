import axios from "axios";
import Cookies from "js-cookie";
import { exchangeToken } from "./AuthWrapper";
import GlobalKeys from "../constants/Keys";
import { logout } from "./AuthWrapper";
import { useNavigate } from "react-router-dom";

const accessToken = Cookies.get(GlobalKeys.AccessTokenKey);
const refreshToken = Cookies.get(GlobalKeys.RefreshTokenKey);
console.log(`Bearer ${accessToken}`);
console.log(`Refresh ${refreshToken}`);

const api = axios.create({
  baseURL: "https://localhost:7270/api", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export const makeApiRequest = async (
  method,
  endpoint,
  data = {},
  headers = {}
) => {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        
        const newAccessToken = await exchangeToken();
        console.log(newAccessToken);
        // Retry the original request with the new access token
        const retryResponse = await api.request({
          method,
          url: endpoint,
          data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        return retryResponse.data;
      } catch (refreshError) {
        throw refreshError; // Throw the refresh token error if token refresh fails
      }
    }

    throw error; // Throw the original error if it's not related to token expiration
  }
};
