import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../requests/api";
import {
  addAuthTokenToConfig,
  removeAuthTokenFromConfig,
} from "../helpers/auth";

const initialAuth = {
  isAuthenticated: false,
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    const isAuthenticatedLocalStorage = localStorage.getItem("isAuthenticated");
    let isAuthenticated = isAuthenticatedLocalStorage === "true" ? true : false;
    setAuth({ isAuthenticated });
  }, []);

  async function login(userData) {
    // A timeout funnction that will get triggered when the token expires
    function loginTimeout(date) {
      const now = new Date();
      const diff = date - now;
      return setTimeout(() => {
        logout();
      }, diff);
    }

    // catching the response data
    let response = {};
    let data = null;
    let token = null;
    let expiry = null;
    try {
      response = await api.post("/api/auth/login/", userData);
      let data = await response.data;
      token = await data.token;
      expiry = await data.expiry;
    } catch (error) {
      throw error;
    }

    // updating the token and the authentitcation
    addAuthTokenToConfig(api, token);
    setAuth((p) => {
      p = JSON.parse(JSON.stringify(p));
      p.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", p.isAuthenticated);
      return p;
    });

    // triggering the login timeout function 
    loginTimeout(new Date(expiry));
    return data;
  }

  async function logout() {
    localStorage.setItem("isAuthenticated", false);
    setAuth(initialAuth);
    let response = null;
    try {
      response = await api.post("/api/auth/logoutall/");
    } catch (error) {
      removeAuthTokenFromConfig(api);
      return error;
    }
    removeAuthTokenFromConfig(api);
    return response;
  }

  async function signup(userData) {
    try {
      await api.post("/api/auth/register/", userData);
    } catch (error) {
      return error;
    }
    const loginUserData = {
      username: userData.username,
      password: userData.password,
    };
    return login(loginUserData);
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

