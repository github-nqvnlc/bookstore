/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Register.scss";
  
import { path } from "../../utils";
import Lightbox from "react-image-lightbox";
import CommonUtils from "../../utils/CommonUtils";
import banner from "../../assets/Banner/bookwallpapers.jfif";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { userRegisterSevice } from "../../services/userService";
import { flatMap } from "lodash";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      role: 3,
      image: "",

      errMessage: "",
      previewUrlImage: "",
      isOpen: false,
    };
  }
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "confirm_password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        let message = "Missing input: " + arrInput[i];
        this.setState({
          errMessage: message,
        });
        break;
      }
    }
    return isValid;
  };
  checkConfirmPassword = () => {
    let isConfirm = true;
    if (this.state.password !== this.state.confirm_password) {
      isConfirm = false;
      let message = "Confirm password is incorrect! Try again";
      this.setState({
        errMessage: message,
      });
    }
    return isConfirm;
  };

  handleUserRegister = async () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;
    let isConfirm = this.checkConfirmPassword();
    if (isConfirm === false) return;

    try {
      let res = await userRegisterSevice({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        image: this.state.image,
      });
      console.log(res);
      if (res && res.errCode === 0) {
        this.props.registerSuccess();
        this.setState({ errMessage: "oke" });
        setTimeout(this.props.navigate("/login"), 5000);
      } else {
        this.setState({
          errMessage: res.errMessage,
        });
        this.props.registerFailed();
      }
    } catch (e) {
      this.setState({
        errMessage: e,
      });
      this.props.registerFailed();
    }
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let imageUrl = URL.createObjectURL(file);
      this.setState({
        previewUrlImage: imageUrl,
        image: base64,
      });
    }
  };

  openPreviewImage = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    //jsx
    let {
      email,
      password,
      confirm_password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
    } = this.state;

    return (
      <div className="register">
        <div className="banner_image">
          <img src={banner} className="banner" />
          {/* <img src={logo} className="logo" /> */}
        </div>
        <div className="section_left">
          <div className="form_container">
            <div className="logo_container">
              <img src={logo} className="logo" />
            </div>
            <div className="title">Register</div>
            <div className="register_conntainer">
              <div className="input_image">
                <img
                  style={{ width: "150px", height: "150px" }}
                  src={
                    this.state.previewUrlImage === ""
                      ? avatar
                      : this.state.previewUrlImage
                  }
                  className="preview_image"
                  onClick={() => this.openPreviewImage()}
                />
                <label
                  className="upload_image"
                  htmlFor="imageUpload"
                  style={{ width: "auto", height: "auto", margin: "1em 0" }}
                >
                  Upload Image <i className="px-1 py-1 fa fa-upload"></i>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={(event) => this.handleOnChangeImage(event)}
                  hidden
                />
              </div>
              <div className="form_group">
                <div
                  className="input_group"
                  // style={{  padding: 0 }}
                ></div>
                <div className="input_group">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                    value={email}
                  />
                </div>
                <div
                  className="input_group"
                  style={{ flexDirection: "row", padding: 0 }}
                >
                  <div className="input_group" style={{ width: "50%" }}>
                    <label>Password</label>
                    <input
                      type="password"
                      onChange={(e) => this.handleOnChangeInput(e, "password")}
                      value={password}
                    />
                  </div>
                  <div className="input_group" style={{ width: "50%" }}>
                    <label>Confirm Password</label>
                    <input
                      type="Password"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "confirm_password")
                      }
                      value={confirm_password}
                    />
                  </div>
                </div>
                <div
                  className="input_group"
                  style={{ flexDirection: "row", padding: 0 }}
                >
                  <div className="input_group col" style={{ width: "50%" }}>
                    <label>First Name</label>
                    <input
                      type="text"
                      onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                      value={firstName}
                    />
                  </div>
                  <div className="input_group col" style={{ width: "50%" }}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="input_group">
                  <label>Address</label>
                  <input
                    type="text"
                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                    value={address}
                  />
                </div>
                <div
                  className="input_group"
                  style={{ flexDirection: "row", padding: 0 }}
                >
                  <div className="input_group" style={{ width: "70%" }}>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "phoneNumber")
                      }
                      value={phoneNumber}
                    />
                  </div>
                  <div className="input_group" style={{ width: "30%" }}>
                    <label>Gender</label>
                    <select
                      type="select"
                      onChange={(e) => this.handleOnChangeInput(e, "gender")}
                      value={gender}
                    >
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                    </select>
                  </div>
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
                    You have account? <Link to="/login">Login</Link>
                  </span>
                </div>
                <div className="input_group">
                  <button
                    type="submit"
                    onClick={() => {
                      this.handleUserRegister();
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewUrlImage}
            onCloseRequest={() => {
              this.setState({ isOpen: false });
            }}
            className="preview_lightbox"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    registerSuccess: () => dispatch(actions.userRegisterFailed()),
    registerFailed: () => dispatch(actions.userRegisterFailed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
