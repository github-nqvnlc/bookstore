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
} from "reactstrap";

import "./Header.scss";
import logo from "../../assets/logo.png";
import avt from "../../assets/avt.jpg";

class HomePage extends Component {
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
  render() {
    let logoBrand = logo;
    let avatar = avt;

    window.addEventListener("scroll", this.checkSticky);
    return (
      <div className="header_container ">
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
                  <DropdownToggle tag="div" className="ex_lang">
                    <DropdownItem
                      tag="i"
                      className="fa fa-language"
                    ></DropdownItem>
                  </DropdownToggle>
                  <DropdownMenu tag="div" className="icon_drop" right>
                    <DropdownItem tag="div" className="lang_en">
                      English
                    </DropdownItem>
                    <DropdownItem tag="div" className="lang_vi">
                      Vietnamese
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="cart">
                    <DropdownItem
                      tag="i"
                      className="fas fa-cart-plus"
                    ></DropdownItem>
                    <DropdownItem
                      tag="span"
                      style={{ right: 10 }}
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
              <img className="avatar_user" src={avatar} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
