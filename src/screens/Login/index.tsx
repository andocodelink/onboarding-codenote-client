import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Auth } from 'aws-amplify';
import LoaderButton from '../../components/LoaderButton';
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      loggedInUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const loggedInUser = await Auth.signIn({
        username: this.state.email,
        password: this.state.password
      });

      this.setState({
        loggedInUser: loggedInUser
      });

      this.props.userHasAuthenticated(true);
      this.props.history.push("/login");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Login"
          loadingText="Logging in…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Login">
        {this.renderForm()}
      </div>
    );
  }
}

export default Login;
