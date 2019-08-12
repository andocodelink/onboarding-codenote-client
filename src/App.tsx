import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { History } from 'history';

import { userHasAuthenticated } from './actions/authenticate';
import ScreensRoot from './screens/Root';
import { getCurrentSession, logout } from './api'

import logo from './logo.svg';
import './App.css';

interface IStates {
  isAuthenticating: boolean,
}

interface IProps {
  userHasAuthenticated: (boolean) => void,
  history: History,
  renderChildren?: boolean
}

export class App extends Component<IProps, IStates> {
  static defaultProps: IProps = {
    userHasAuthenticated: () => {},
    history: {} as History,
    renderChildren: true
  }
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await getCurrentSession();
      this.props.userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    await logout();
    this.props.userHasAuthenticated(false);
    this.props.history.push('/login');
  }

  render() {
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        {this.props.renderChildren && <ScreensRoot />}
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    userHasAuthenticated,
  },
  dispatch
);

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);
