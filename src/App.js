import React from "react";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { LoginPage, LogoutPage, SignupPage } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

const appRoutes = [
  {
    path: "/",
    noProtection: true,
    isProtected: false,
    component: () => {
      return <h1>Welcome To Billy</h1>;
    },
  },
  {
    path: "/login",
    isProtected: false,
    component: LoginPage,
  },
  {
    path: "/signup",
    isProtected: false,
    component: SignupPage,
  },
  {
    path: "/logout",
    noProtection: true,
    isProtected: false,
    component: LogoutPage,
  },
];

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <Routes links={appRoutes} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}
