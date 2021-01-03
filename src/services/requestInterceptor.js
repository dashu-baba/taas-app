import axios from "axios";
import store from "../store";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    return getAuthUserTokens()
      .then(({ tokenV3: token }) => {
        return resolve(token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to pass auth token
axiosInstance.interceptors.request.use((config) => {
  return getToken()
    .then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    })
    .catch((err) => {
      return config;
    });
});
