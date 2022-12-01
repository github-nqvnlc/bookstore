/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
  
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";

import "./ManageBook.scss";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Label,
  Row,
  UncontrolledCollapse,
} from "reactstrap";
import CurrencyFormat from "react-currency-format";
import ModalCreateBook from "./ModalCreateBook";
import ModalEditBook from "./ModalEditBook";
import labelDiscount from "./../../../../assets/labelDiscount.png";
import Select, { components, DropdownIndicatorProps } from "react-select";
import BookDataGrid from "./BookDataGrid";

const SelectButtonIcon = (DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator>
      <i class="fas fa-search"></i>
    </components.DropdownIndicator>
  );
};

class ManageBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      isLoading: false,
      isOpen: false,
      previewImage: "",
      book: [],
      bookEdit: {},

      arrAuthor: [],
      arrPublisher: [],
      arrCategory: [],
      arrType: [],

      filterCategory: "",
      filterType: "",
      filterPublisher: "",
      filterAuthor: "",

      isDisable: false,
    };
  }
  componentDidMount() {
    this.props.getBook("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.book !== this.props.book) {
      this.setState({
        book: this.props.book,
      });
    }

    if (prevProps.author !== this.props.author) {
      this.setState({
        arrAuthor: this.props.author,
      });
    }

    if (prevProps.publisher !== this.props.publisher) {
      this.setState({
        arrPublisher: this.props.publisher,
      });
    }
    if (prevProps.category !== this.props.category) {
      this.setState({
        arrCategory: this.props.category,
      });
    }
    if (prevProps.type !== this.props.type) {
      this.setState({
        arrType: this.props.type,
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

  openPreviewImage = (image) => {
    this.setState({
      isOpen: true,
      previewImage: image,
    });
  };

  handleCreateBook = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleEditBook = (book) => {
    this.setState({
      isOpenModalEdit: true,
      bookEdit: book,
    });
  };

  handleDeleteBook = (book) => {
    this.props.deleteBook(book.id);
  };

  handleDetailBook = (book) => {
    this.props.history.push(`/system/manager/book/${book.id}`);
  };

  handleOnChangeSeachBook = (Value, actionMeta) => {
    this.props.history.push(`/system/manager/book/${Value.value}`);
  };

  render() {
    return (
      <div>
        <div className="title">Manage Book</div>
        <div className="section_body container">
          <ModalCreateBook
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
          />
          <ModalEditBook
            isOpen={this.state.isOpenModalEdit}
            toggleModal={this.toggleModalEdit}
            bookEdit={this.state.bookEdit}
            previewImage={this.previewImage}
            checkEdit={"ALL"}
          />
          <div className="content_header">
            <button
              onClick={() => this.handleCreateBook()}
              className="button_create"
              style={{
                marginBottom: "1rem",
                fontSize: "14px",
              }}
            >
              <i class="fas fa-plus"></i> Create new book
            </button>
            
          </div>
          <div className="center_body">
            <div className="content_body ">
              <BookDataGrid/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     
    book: state.manager.book,
    author: state.manager.author,
    publisher: state.manager.publisher,
    category: state.manager.category,
    type: state.manager.type,

    // get by name
    authorByName: state.manager.authorByName,
    publisherByName: state.manager.publisherByName,
    categoryByName: state.manager.categoryByName,
    typeByName: state.manager.typeByName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
    getBook: (id) => dispatch(actions.getBook(id)),
    getAuthor: () => dispatch(actions.getAuthor("ALL")),
    getAuthorByName: (name) => dispatch(actions.getAuthorByName(name)),
    getPublisher: () => dispatch(actions.getPublisher("ALL")),
    getCategory: () => dispatch(actions.getCategory("ALL")),
    getType: () => dispatch(actions.getType("ALL")),
    createAuthor: (data) => dispatch(actions.createAuthor(data)),
    createPublisher: (data) => dispatch(actions.createPublisher(data)),
    createCategory: (data) => dispatch(actions.createCategory(data)),
    createType: (data) => dispatch(actions.createType(data)),
    deleteAuthor: (id) => dispatch(actions.deleteAuthor(id)),
    deleteBook: (id) => dispatch(actions.deleteBook(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageBook)
);
