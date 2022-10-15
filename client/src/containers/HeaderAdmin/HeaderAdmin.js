import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
  
import { adminMenu } from "./menuApp";
import "./HeaderAdmin.scss";
import { Link } from "react-router-dom";

class Header extends Component {
  
  render() {
    const { processLogout, userInfo } = this.props;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Link className="back_to_home" to="/"><i class="fas fa-home"></i></Link>
        </div>
        <div className="header-button">

          
          <div className="welcome">C {userInfo && userInfo.lastName ? userInfo.lastName : ''}!</div>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
