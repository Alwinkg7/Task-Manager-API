import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} /> // If token exists, render the component
        ) : (
          <Redirect to="/login" /> // Otherwise, redirect to login page
        )
      }
    />
  );
};

export default PrivateRoute;
