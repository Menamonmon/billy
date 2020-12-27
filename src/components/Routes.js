import React from "react";
import ProtectedRoute, { UnprotectedRoute } from "./ProtectedRoute";

export default function Routes({ links }) {
  return (
    <React.Fragment>
      {links.map(({ path, component, isProtected }) =>
        isProtected ? (
          <ProtectedRoute
            exact
            strict
            path={path}
            component={component}
            redirect="/"
          />
        ) : (
          <UnprotectedRoute
            exact
            strict
            path={path}
            component={component}
            redirect="/"
          />
        )
      )}
    </React.Fragment>
  );
}
