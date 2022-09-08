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

import _ from "lodash";

class ModalEditUser extends Component {
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
      roleId: 0,
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  toggle = () => {
    this.props.toggleModal();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
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

  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                    value={this.state.email}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    onChange={(e) => this.handleOnChangeInput(e, "password")}
                    value={this.state.password}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    type="text"
                    onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                    value={this.state.firstName}
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
                    value={this.state.lastName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Address</Label>
              <Input
                name="address"
                onChange={(e) => this.handleOnChangeInput(e, "address")}
                value={this.state.address}
              />
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    name="phoneNumber"
                    onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                    value={this.state.phoneNumber}
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
                    value={this.state.gender}
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
                    onChange={(e) => this.handleOnChangeInput(e, "roleId")}
                    value={this.state.roleId}
                  >
                    <option value={0}>Admin</option>
                    <option value={1}>Manager</option>
                    <option value={2}>User</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
            className="px-3"
          >
            Save Changes
          </Button>
          <Button
            color="danger"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
