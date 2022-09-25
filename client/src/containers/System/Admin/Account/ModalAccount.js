/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import "./ModalAccount.scss";
import { emitter } from "../../../../utils/emitter";
import CommonUtils from "../../../../utils/CommonUtils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as actions from "../../../../store/actions";
import avatar from "../../../../assets/avatar.png";

class ModalAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      role: 1,
      image: "",

      previewUrlImage: "",
      isOpen: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.account !== this.props.account) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: 0,
        role: 1,
        image: "",
        previewUrlImage: "",
      });
    }
  }

  toggle = () => {
    this.props.toggleModal();
  };

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
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing input: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleCreateNewAccount = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;
    this.toggle();
    //fire redux
    this.props.createNewAccount({
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
    this.toggle();
  };

  render() {
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      role,
    } = this.state;
    let selectRole = this.props.role;

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create a new user
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row mt={3}>
                <Col md={6}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      onChange={(e) => this.handleOnChangeInput(e, "email")}
                      value={email}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      onChange={(e) => this.handleOnChangeInput(e, "password")}
                      value={password}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row mt={3}>
                <Col md={6}>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                      value={firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                      value={lastName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup mt={3}>
                <Label>Address</Label>
                <Input
                  name="address"
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                  value={address}
                />
              </FormGroup>
              <Row mt={3}>
                <Col md={6}>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      name="phoneNumber"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "phoneNumber")
                      }
                      value={phoneNumber}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Gender</Label>
                    <Input
                      name="gender"
                      type="select"
                      onChange={(e) => this.handleOnChangeInput(e, "gender")}
                      value={gender}
                    >
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      name="roleId"
                      type="select"
                      onChange={(e) => this.handleOnChangeInput(e, "role")}
                      value={role}
                    >
                      {
                        selectRole &&
                          selectRole.length > 0 &&
                          selectRole.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })
                        /* <option value={0}>Admin</option>
                                        <option value={1}>Manager</option>
                                        <option value={2}>User</option> */
                      }
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row mt={3}>
                <Col md={3}>
                  <Label>Profile Image</Label>
                  <div className="py-2">
                    <Label className="upload_image" htmlFor="imageUpload">
                      Upload Image <i className="px-1 py-1 fa fa-upload"></i>
                    </Label>
                    <Input
                      type="file"
                      id="imageUpload"
                      onChange={(event) => this.handleOnChangeImage(event)}
                      hidden
                    />
                  </div>
                </Col>
                {this.state.previewUrlImage && (
                  <Col md={9} style={{ minHeight: "300px" }} className="mt-4 ">
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={this.state.previewUrlImage}
                      className="preview_image"
                      onClick={() => this.openPreviewImage()}
                    />
                  </Col>
                )}
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.handleCreateNewAccount();
              }}
              className="button px-3"
            >
              Create new
            </Button>
            <Button
              onClick={() => {
                this.toggle();
              }}
              className="button_danger px-3"
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewUrlImage}
            onCloseRequest={() => {
              this.setState({ isOpen: false });
              this.toggle();
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
    account: state.admin.account,
    role: state.admin.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewAccount: (data) => dispatch(actions.createNewAccount(data)),
    getAllAccount: () => dispatch(actions.getAllAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAccount);
