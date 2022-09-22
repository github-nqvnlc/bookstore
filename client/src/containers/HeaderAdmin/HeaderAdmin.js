import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { LANGUAGES } from "../../utils/constant"
import "./HeaderAdmin.scss";
import { Link } from "react-router-dom";

class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="header-button">
          <Link className="back_to_home" to="/">Back to Homepage</Link>

          <div className={language === LANGUAGES.VI ? "lang-vi active" : "lang-vi" }>
            <span onClick={()=>this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>
          </div>
          <span>|</span>
          <div className={language === LANGUAGES.EN ? "lang-en active" : "lang-en" }>
            <span onClick={()=>this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
          </div>
        
          <div className="welcome"><FormattedMessage id="header.welcome"/> {userInfo && userInfo.lastName ? userInfo.lastName : ''}!</div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
