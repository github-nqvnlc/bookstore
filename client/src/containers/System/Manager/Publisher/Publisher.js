import React, { Component } from "react";
  
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Publisher.scss";
import { Button, Table } from "reactstrap";
import CurrencyFormat from "react-currency-format";
import ModalCreatePublisher from "./ModalCreatePublisher";
import ModalEditPublisher from "./ModalEditPublisher";
import PublisherDataGrid from "./PublisherDataGrid";

class Publisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      isOpen: false,
      publisher: [],
      publisherEdit: {},
    };
  }
  componentDidMount() {
    this.props.getPublisher("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.publisher !== this.props.publisher) {
      this.setState({
        publisher: this.props.publisher,
      });
    }
  }

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

  handleCreatePublisher = () => {
    this.setState({
      isOpenModal: true,
    });
  };


  render() {
    let arrPublisher = this.state.publisher;
    return (
      <div>
        <div className="title">Manage Publisher</div>
        <div className="section_body container">
          <ModalCreatePublisher
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
          />
          <div className="content_header">
            <button
              onClick={() => this.handleCreatePublisher()}
              className="button_create"
              style={{
                marginBottom: "1rem",
              }}
            >
              <i class="fas fa-plus"></i> Create new publisher
            </button>
          </div>
          <div className="content_body">
            <PublisherDataGrid />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     
    publisher: state.manager.publisher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPublisher: (id) => dispatch(actions.getPublisher(id)),
    deletePublisher: (id) => dispatch(actions.deletePublisher(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publisher);
