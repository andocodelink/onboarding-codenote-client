import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connectAuthen } from '../../containers'

const AuthenticatedRoute = ({ component: C, isAuthenticated, props: cProps = {}, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location
              .search}`}
          />}
  />;

export default connectAuthen(AuthenticatedRoute);
