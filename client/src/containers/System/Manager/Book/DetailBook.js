import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./DetailBook.scss";
import Loading from "../../../../components/Loading/Loading";

class DetailBook extends Component {
  render() {
    return (
      <div>
        <div className="title">Detail Book</div>
        <div className="container">
          <Loading style={{ height: "100vh" }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);
