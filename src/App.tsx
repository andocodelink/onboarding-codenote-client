import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Auth } from 'aws-amplify';
import * as H from 'history';

import logo from './logo.svg';
import './App.css';

import { userHasAuthenticated } from './actions/authenticate';
import ScreensRoot from './screens/Root';
import { ImageProps } from 'react-bootstrap';
import { IsAuthenticated } from 'aws-sdk/clients/iot';

interface IProps {
  userHasAuthenticated: (isAuthenticated: boolean) => void,
  history: H.History
}

interface IState {
  isAuthenticating: boolean
}

class App extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
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
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
    this.props.history.push('/login');
  }

  render() {
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <ScreensRoot />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    userHasAuthenticated,
  },
  dispatch
);

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);
