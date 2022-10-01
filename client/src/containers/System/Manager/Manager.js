import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./Manager.scss";
import SideContent from "./SideContent/SideContent";
import ManageBook from "./Book/ManageBook";
import Category from "./Category/Category";
import Author from "./Author/Author";
import TypeBook from "./TypeBook/TypeBook";
import Publisher from "./Publisher/Publisher";
import SideBar from "./SideBar/SideBar";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}



  render() {
    return (
      <div>
        <div className="section">
          <div className="body">
            <div className="side_bar">
              <SideBar />
            </div>
            <div className="side_content">
              <Switch>
                <Route
                  path="/system/manager/dashboard"
                  component={SideContent}
                />
                <Route
                  path="/system/manager/manage-customer"
                  component={SideContent}
                />
                <Route
                  path="/system/manager/manage-book"
                  component={ManageBook}
                />
                <Route
                  path="/system/manager/manage-author"
                  component={Author}
                />
                <Route
                  path="/system/manager/manage-publisher"
                  component={Publisher}
                />
                <Route
                  path="/system/manager/manage-category"
                  component={Category}
                />
                <Route
                  path="/system/manager/manage-type-book"
                  component={TypeBook}
                />
              </Switch>
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
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
