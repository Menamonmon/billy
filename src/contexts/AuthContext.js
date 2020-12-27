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
    let isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
    isAuthenticated = isAuthenticated === true ? true : false;
    setAuth({ isAuthenticated });
  }, []);

  async function login(userData) {
    function loginTimeout(date) {
      const now = new Date();
      const diff = date - now;
      setTimeout(() => {
        logout();
      }, diff);
    }
    let response = {};
    try {
      response = await api.post("/api/auth/login/", userData);
    } catch (error) {
      console.log(error);
      return;
    }
    let data = await response.data;
    let { token, expiry } = await data.token;
    addAuthTokenToConfig(token);
    setAuth((p) => {
      p = JSON.parse(JSON.stringify(p));
      p.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", p.isAuthenticated);
      return p;
    });
    loginTimeout(expiry);
    return data;
  }

  async function logout() {
    localStorage.setItem("isAuthenticated", false);
    setAuth(initialAuth);
    let response = await api.post("/api/auth/logoutall/");
    removeAuthTokenFromConfig();
    return response;
  }

  async function signup(userData) {
    try {
      await api.post("/api/auth/register/", userData);
    } catch (error) {
      console.log(error);
    }
    const loginUserData = {
      username: userData.username,
      password: userData.password,
    };
    return login(loginUserData);
  }

  return (
    <AuthContext.Provider
      value={{ ...auth, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
