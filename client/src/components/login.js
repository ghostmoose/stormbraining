import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, lockSuccess, lockError, receiveLogout } from '../actions/auth_actions';
import { browserHistory } from 'react-router';

export default class Login extends Component {


  static propTypes = {
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func,
    children: PropTypes.object,
    router: PropTypes.object,
    auth: PropTypes.object,
    lockSuccess: PropTypes.func,
    lockError: PropTypes.func,
    receiveLogout: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.lock = new Auth0Lock('Wxg5EhfSanTioiIfdLOdlCwdKoK7twjn', 'app50347872.auth0.com');
  }

  onLogin() {
    this.lock.show((err, profile, token) => {
   // If we receive an error, we dispatch the lockError action
      if (err) {
        this.props.lockError(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.props.lockSuccess(profile, token);
      if (this.props.isAuthenticated) {
        browserHistory.push('/home');
      }
    });
  }

  onLogout() {
    localStorage.removeItem('id_token');
    this.props.receiveLogout();
  }


  render() {
    const { isAuthenticated, errorMessage } = this.props;
    return (
      <div className="landing">
        <div>
          <h1 className="title">Stormbraining</h1>
        </div>
        <div>
          {!isAuthenticated &&
            <button
              errorMessage={errorMessage}
              onClick={this.onLogin}
              className="btn btn-primary"
            >
              Login
            </button>
          }

          {isAuthenticated &&
            <button
              onClick={this.onLogout}
              className="btn btn-primary"
            >
              Logout
            </button>
          }

        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, lockSuccess, lockError, receiveLogout }, dispatch);
}

function mapStateToProps({ auth }) {
  return auth;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
