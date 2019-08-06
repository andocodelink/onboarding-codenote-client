import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated
});

export default connect(
  mapStateToProps
)(AuthenticatedRoute);
