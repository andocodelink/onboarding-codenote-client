import { connect } from 'react-redux'
import { login, logout } from '../actions';

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  loginSucceed: () => dispatch(login(true)),
  loginFailed: () => dispatch(login(false)),
  logout: () => dispatch(logout())
})

export const connectAuthen = connect(mapStateToProps, mapDispatchToProps);