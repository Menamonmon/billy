import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute, { UnprotectedRoute } from "./ProtectedRoute";

export default function Routes({ links }) {
  return (
    <React.Fragment>
      {links.map(({ path, component, isProtected, noProtection }) => {
        if (noProtection) {
          return (
            <Route exact strict path={path} component={component} key={path} />
          );
        } else {
          if (isProtected) {
            return (
              <ProtectedRoute
                path={path}
                component={component}
                redirect="/"
                key={path}
              />
            );
          } else {
            return (
              <UnprotectedRoute
                path={path}
                component={component}
                redirect="/"
                key={path}
              />
            );
          }
        }
      })}
    </React.Fragment>
  );
}
