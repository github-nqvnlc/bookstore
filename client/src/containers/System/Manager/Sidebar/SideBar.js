import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./SideBar.scss";
import { Link } from "react-router-dom";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
    };
  }
  componentDidMount() {
    // this.setState({ isOpenMenu: false })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleMenu = () => {
    this.setState({
      isOpenMenu: !this.state.isOpenMenu,
    });
  };
  handleMenuLink = () => {
    this.setState({
      isOpenMenu: false,
    });
  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar_container">
          <div className="toggle_menu" onClick={() => this.handleMenu()}>
            {this.state.isOpenMenu === true ? (
              <i class="fas fa-arrow-left"></i>
            ) : (
              <i class="fas fa-arrow-right"></i>
            )}
          </div>
          {/* <div className="input_group">
              <input
                className={this.state.isOpenMenu === true ? "" : "input_none"}
                placeholder="Search..."
              /><button className={this.state.isOpenMenu === true ? "button_display" : "button_none"}><i class="fas fa-search"></i></button>
            </div> */}
          <div className="sidebar_list">
            <ul>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/dashboard"
              >
                <li>
                  <i class="fas fa-tachometer-alt"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Dashboard
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-customer"
              >
                <li>
                  <i class="fas fa-users"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Customer
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-book"
              >
                <li>
                  <i class="fas fa-book"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Book
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-author"
              >
                <li>
                  <i class="fas fa-user-edit"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Author
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-publisher"
              >
                <li>
                  <i class="fas fa-truck-loading"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Publisher
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-category"
              >
                <li>
                  <i class="fas fa-tags"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Category
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-type-book"
              >
                <li>
                  <i class="fas fa-vials"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Type Book
                  </div>
                </li>
              </Link>
              <Link
                onClick={() => this.handleMenuLink()}
                to="/system/manager/manage-order"
              >
                <li>
                  <i class="fas fa-shopping-cart"></i>
                  <div
                    className={
                      this.state.isOpenMenu === true
                        ? "text_list"
                        : "text_list_none"
                    }
                  >
                    Manage Order
                  </div>
                </li>
              </Link>
            </ul>
          </div>
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
