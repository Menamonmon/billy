import axios from "axios";

export function addAuthTokenToConfig(token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export function removeAuthTokenFromConfig() {
  axios.defaults.headers.common["Authorization"] = null;
}
