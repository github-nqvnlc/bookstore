import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./ManageBook.scss";
import SideBar from "../Sidebar/SideBar";
import SideContent from "../SideContent/SideContent";

class ManageBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,

      isOpen: false,
      previewImage: "",
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleModalEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  openPreviewImage = (image) => {
    this.setState({
      isOpen: true,
      previewImage: image,
    });
  };

  render() {
    let arrAccount = this.state.account;
    console.log(arrAccount);
    // let arrRole = this.state.role;
    return (
      <div>
        <div className="section">
          <div className="body">
            <div className="side_bar">
              <SideBar />
            </div>
            <div className="side_content">
              <SideContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    role: state.admin.role,
    account: state.admin.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getAllAccount: () => dispatch(actions.getAllAccount()),
    deleteAccount: (id) => dispatch(actions.deleteAccount(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);