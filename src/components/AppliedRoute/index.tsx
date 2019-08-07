import React from 'react';
import { Route } from 'react-router-dom';

interface Props {
  component: React.ComponentType,
  props?: any
  exact?: boolean,
  path?: string
}

const AppliedRoute = ({ component: C, props: cProps, ...rest }: Props) =>
  <Route {...rest} render={ props => <C {...props} {...cProps} /> } />;

export default AppliedRoute;
