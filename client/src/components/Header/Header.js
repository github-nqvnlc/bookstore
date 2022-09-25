/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { LANGUAGES } from "../../utils/constant";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions/appActions";

import "./Header.scss";
import logo from "../../assets/logo.png";
import avt from "../../assets/avatar.png";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togglerOpen: false,
      isSticky: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  checkSticky = () => {
    if (window.scrollY >= 50) {
      this.setState({
        isSticky: true,
      });
    } else {
      this.setState({
        isSticky: false,
      });
    }
  };

  handleToggler = () => {
    this.setState({
      togglerOpen: !this.state.togglerOpen,
    });
  };
  toggleNav() {
    this.setState({
      togglerOpen: !this.state.togglerOpen,
    });
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let logoBrand = logo;
    let avatar = avt;
    const { processLogout, language, userInfo, image } = this.props;
    if (userInfo && userInfo !== null) {
      this.props.getUserImage(userInfo.userId);
    }
    console.log(userInfo.roleId);
    window.addEventListener("scroll", this.checkSticky);

    return (
      <div className="header_container ">
        <div className="container">
          <div className="language">
            <div
              className="check_route"
              style={
                userInfo.roleId === "3"
                  ? { display: "none" }
                  : { display: "block", padding: "0 1em", margin: "o 1em" }
              }
            >
              {this.props.isLoggedIn ? (
                <div>
                  {userInfo && userInfo.roleId === "1" ? (
                    <Link to="/system/admin/manage-account">Go Admin</Link>
                  ) : (
                    <Link to="/system/manager/manage-book">Go Manager</Link>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={
                language === LANGUAGES.VI ? "lang-vi active" : "lang-vi"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
            </div>
            <span>|</span>
            <div
              className={
                language === LANGUAGES.EN ? "lang-en active" : "lang-en"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
        <div className="header_topbar">
          <div className="topbar_content container">
            <div className="topbar_content_left col-xs-12 col-sm-6 col-md-6">
              <div className="topbar_brand ">
                <img src={logoBrand} />
              </div>
            </div>
            <div className="topbar_content_right col-xs-12 col-sm-6 col-md-6">
              <div className="topbar_icon">
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="cart">
                    <DropdownItem
                      tag="i"
                      className="fas fa-cart-plus"
                    ></DropdownItem>
                    <DropdownItem
                      tag="span"
                      style={{ right: "-5px" }}
                      className="count"
                    >
                      1
                    </DropdownItem>
                  </DropdownToggle>
                  <DropdownMenu className="icon_drop" right>
                    <DropdownItem tag="div" className="lang_en">
                      English
                    </DropdownItem>
                    <DropdownItem tag="div" className="lang_vi">
                      Vietnamese
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="notice">
                    <DropdownItem tag="i" className="fa fa-bell"></DropdownItem>
                    <DropdownItem tag="span" className="count">
                      1
                    </DropdownItem>
                  </DropdownToggle>
                  <DropdownMenu className="icon_drop" right>
                    <DropdownItem tag="div" className="lang_en">
                      English
                    </DropdownItem>
                    <DropdownItem tag="div" className="lang_vi">
                      Vietnamese
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              {this.props.isLoggedIn ? (
                <UncontrolledDropdown>
                  <DropdownToggle
                    tag="div"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "0 10px",
                    }}
                  >
                    <img
                      className="avatar_user"
                      src={image && image !== null ? image : avatar}
                    />
                  </DropdownToggle>
                  <DropdownMenu className="icon_drop" right>
                    <DropdownItem tag="div" className="lang_en">
                      Profile{" "}
                      <span>
                        {userInfo && userInfo.lastName ? userInfo.lastName : ""}
                      </span>
                    </DropdownItem>
                    <DropdownItem
                      tag="div"
                      className="lang_vi"
                      onClick={processLogout}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <Button className="px-3 button_login">
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div
          className={this.state.isSticky ? "header_menu sticky" : "header_menu"}
        >
          <div className="main_menu container">
            <Navbar style={{ padding: 0 }} expand="lg">
              <NavbarToggler className="nav_toggler" onClick={this.toggleNav}>
                <i className="fas fa-bars"></i>
              </NavbarToggler>
              <Collapse isOpen={this.state.togglerOpen} navbar>
                <Nav className="list_menu" navbar>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.vietnamesebooks" />
                    </NavLink>
                    <div className="sub_content"></div>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.foregionbooks" />
                    </NavLink>
                    <div className="sub_content"></div>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.e-books" />
                    </NavLink>
                    <div className="sub_content">
                      <div className="">abc</div>
                    </div>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.stationery" />
                    </NavLink>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.sovernir" />
                    </NavLink>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.musictaps" />
                    </NavLink>
                  </NavItem>
                  <NavItem className="menu_item">
                    <NavLink className="menu_link">
                      <FormattedMessage id="header.promotions" />
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
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
    userInfo: state.user.userInfo,
    image: state.user.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getUserImage: (id) => dispatch(actions.getUserImage(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
