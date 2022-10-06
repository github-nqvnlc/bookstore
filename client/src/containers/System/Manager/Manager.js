import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils/constant";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./Manager.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import ManageAccount from "../Admin/Account/ManageAccount";
import ManageBook from "./Book/ManageBook";
import Category from "./Category/Category";
import Author from "./Author/Author";
import TypeBook from "./TypeBook/TypeBook";
import Publisher from "./Publisher/Publisher";
import SideBar from "./SideBar/SideBar";
import DetailBook from "./Book/DetailBook";
import PageNotFound from "../../../components/404/PageNotFound";
import Order from "./Order/Order";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <CustomScrollbars>
              <div className="side_content">
                <Switch>
                  <Route path={path.DASHBOARD} component={ManageBook} />
                  <Route path={path.MANAGER_CUSTOMER} component={ManageAccount} />
                  <Route path={path.MANAGER_BOOK} component={ManageBook} />
                  <Route path={path.MANAGER_AUTHOR} component={Author} />
                  <Route path={path.MANAGER_PUBLISHER} component={Publisher} />
                  <Route path={path.MANAGER_CATEGORY} component={Category} />
                  <Route path={path.MANAGER_TYPE} component={TypeBook} />
                  <Route path={path.MANAGER_ORDER} component={Order} />
                  <Route path={path.DETAIL_BOOK} component={DetailBook} />
                  <Route path="/not-found" component={PageNotFound} />
                </Switch>
              </div>
            </CustomScrollbars>
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

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
