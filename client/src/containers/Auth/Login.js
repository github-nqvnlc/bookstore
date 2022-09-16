import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import banner from "../../assets/Banner/bookwallpapers.jfif";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

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
        <div className="login">
          <div className="banner_image">
            <img src={banner} className="banner" />
          </div>
          <div className="section_left">
            <div className="form_container">
              <div className="logo_container">
                <img src={logo} className="logo" />
              </div>
              <div className="title">Login</div>
              <div className="form_group">
                <div className="input_group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={this.state.username}
                    onChange={(e) => {
                      this.handleOnChangeUsername(e);
                    }}
                    required
                  />
                </div>
                <div className="input_group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.handleOnChangePassword(e);
                    }}
                    required
                  />
                </div>
                <div className="text_group">
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      textAlign: "left",
                      fontStyle: "italic",
                    }}
                  >
                    {this.state.errMessage}
                  </span>
                  <span>
                    You don't have account? <Link to="/register">Register</Link>
                  </span>
                </div>
                <div className="text_group">
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      textAlign: "left",
                      fontStyle: "italic",
                    }}
                  ></span>
                  <span>
                    {" "}
                    <a>Forgot password?</a>
                  </span>
                </div>
                <div className="input_group">
                  <button
                    type="submit"
                    onClick={(e) => {
                      this.handleLogin(e);
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
