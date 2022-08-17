import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="loginBackground">
          <div className="loginContainer">
            <h1>Login</h1>
            <input type="text" required />
            <label for="text">
              <span>Email</span>
            </label>
            <input type="password" name="" id="" required />
            <label for="password">
              <span>Password</span>
            </label>
            <button type="submit">Login</button>
            <p>
              <a href="">Forgot password?</a>
              <a href="">Don't have an account?</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
