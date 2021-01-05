import axios from "axios";

export function addAuthTokenToConfig(api, token) {
  console.log("TOKEN HEADER ADDED");
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export function removeAuthTokenFromConfig(api) {
  api.defaults.headers.common["Authorization"] = null;
}
