import React, { Component } from "react";
import { connect } from "react-redux";

import "./UserManage.scss";
import {
  getAllUserSevice,
  createNewUserSevice,
  deleteUserSevice,
  editUserSevice,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUser();
  }

  getAllUser = async () => {
    let response = await getAllUserSevice("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUser: response.users,
        },
        () => {}
      );
    }
  };

  handleCreateNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserSevice(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUser();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  editUser = async (user) => {
    try {
      let res = await editUserSevice(user);
      if (res && res.errCode === 0) {
        await this.getAllUser();
        this.setState({
          isOpenModalEditUser: false,
        });
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = async (user) => {
    console.log(user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  handleDeleteUser = async (user) => {
    let res = await deleteUserSevice(user.id);
    try {
      if (res && res.errCode === 0) {
        await this.getAllUser();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      alert("error");
    }
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleModal={this.toggleModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleModal={this.toggleEditModal}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">Manage Users</div>
        <div className="mx-3 ">
          <button
            type="button"
            className="btn btn-primary px-3 "
            onClick={() => this.handleCreateNewUser()}
          >
            Create new user
          </button>
        </div>
        <div className="user-table mt-4 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
              {arrUser &&
                arrUser.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName + " " + item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success px-3 mx-3"
                          onClick={() => this.handleEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger px-3 mx-3"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
