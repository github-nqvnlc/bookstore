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
import Lightbox from "react-image-lightbox";
import CommonUtils from "../../../../utils/CommonUtils";
import * as actions from "../../../../store/actions";
import _ from "lodash";

class ModalEditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      role: "",
      image: "",

      isOpen: false,
      previewUrlImage: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    let image64 = "";

    if (prevProps.editAccount !== this.props.editAccount) {
      let account = this.props.editAccount;
      if (account.image) {
        image64 = new Buffer(account.image, "base64").toString("binary");
      }
      this.setState(
        {
          id: account.id,
          email: account.email,
          password: "hashcode",
          firstName: account.firstName,
          lastName: account.lastName,
          address: account.address,
          phoneNumber: account.phoneNumber,
          gender: account.gender,
          role: account.roleId,
          image: "",
          previewUrlImage: image64,
        },
        () => {
          console.log("Check set state image", this.state.image);
        }
      );
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

  handleEditAccount = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;

    this.toggle();
    //fire redux
    this.props.editAccountRedux({
      id: this.state.id,
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
    this.props.userInfo.roleId = this.state.role;
    console.log(this.props.userInfo.roleId);
    console.log(this.state.image);
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
    console.log(this.props.role);

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Edit account</ModalHeader>
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
                      disabled
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
                      disabled
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
                      Upload Image <i class="px-1 py-1 fa fa-upload"></i>
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
                this.handleEditAccount();
              }}
              className="button px-3"
            >
              Save
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
    userInfo: state.user.userInfo,
    account: state.admin.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAccountRedux: (data) => dispatch(actions.editAccount(data)),
    getAllAccount: () => dispatch(actions.getAllAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAccount);
