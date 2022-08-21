import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);

      if (data && data.errorCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errorCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message });
        }
      }
    }
  };

  render() {
    //jsx

    return (
      <>
        <div className="loginBackground">
          <div className="loginContainer">
            <h1>Login</h1>
            <input
              type="text"
              value={this.state.username}
              onChange={(e) => {
                this.handleOnChangeUsername(e);
              }}
              required
            />
            <label for="text">
              <span>Username</span>
            </label>
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => {
                this.handleOnChangePassword(e);
              }}
              required
            />
            <label for="password">
              <span>Password</span>
            </label>
            <p
              style={{
                // color: "red",
                fontSize: 12,
                textAlign: "left",
                fontStyle: "italic",
              }}
            >
              {this.state.errMessage}
            </p>
            <button
              onClick={(e) => {
                this.handleLogin(e);
              }}
            >
              Login
            </button>
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
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
