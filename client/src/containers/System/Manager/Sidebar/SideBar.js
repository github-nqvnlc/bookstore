import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import "./SideBar.scss";

import {} from "reactstrap";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div className="sidebar">
          <ul style={{ margin: 0, padding: 0 }}>
            <li className="sidebar_header">Menu</li>
            <li className="sidebar_menu">Manage Book</li>
            <li className="sidebar_menu">Manage Author</li>
            <li className="sidebar_menu">Manage Category</li>
            <li className="sidebar_menu">Manage Type Book</li>
            <li className="sidebar_footer">Manage Publisher</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
