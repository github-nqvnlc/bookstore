import React, { Component } from "react";
import { Spinner } from "reactstrap";
import "./Loading.scss";

export default class Loading extends Component {
  render() {
    return (
      <div className="spinner">
        <Spinner color="success" />
      </div>
    );
  }
}
