/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
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
import labelDiscount from "./../../../../assets/labelDiscount.png"
import Select from "react-select";


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

    if (prevState.filterAuthor !== this.state.filterAuthor) {
      this.render()
    }
    if (prevState.filterPublisher !== this.state.filterPublisher) {
      this.render()
    }
    if (prevState.filterCategory !== this.state.filterCategory) {
      this.render()
    }
    if (prevState.filterType !== this.state.filterType) {
      this.render()
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
  }

  handleOnChangeFilterAuthor = (Value, actionMeta) => {
    if (Value === null) {
      this.setState({
        filterAuthor: ""
      })
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        filterAuthor: Value.value,
      })
    }
  }
  handleOnChangeFilterPublisher = (Value, actionMeta) => {
    if (Value === null) {
      this.setState({
        filterPublisher: ""
      })
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        filterPublisher: Value.value,
      })
    }
  }
  handleOnChangeFilterCategory = (Value, actionMeta) => {
    if (Value === null) {
      this.setState({
        filterCategory: ""
      })
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        filterCategory: Value.value,
      })
    }
  }

  handleOnChangeFilterType = (Value, actionMeta) => {
    if (Value === null) {
      this.setState({
        filterType: ""
      })
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        filterType: Value.value,
      })
    }
  }

  handleClearFilterBook = () => {
    this.setState({
      filterAuthor: "",
      filterPublisher: "",
      filterType: "",
      filterCategory: ""
    })

    // this.handleOnChangeFilterPublisher 

  }

  render() {
    let arrBook = this.state.book

    let { arrAuthor, arrPublisher, arrCategory, arrType } = this.state
    let { filterCategory, filterType, filterAuthor, filterPublisher } = this.state
    console.log("A: ", filterAuthor, "P:", filterPublisher, "C:", filterCategory, "T:", filterType)
    let filter = [...arrBook]
    let book = []
    // if (filterCategory === "") {
    //   if (filterType === "") {
    //     book.push(...arrBook)
    //   } else {
    //     let result = arrBook.filter(arrBook => arrBook.typeId === filterType)
    //     book.push(...result)
    //   }
    // } else {
    //   let result = arrBook.filter(arrBook => arrBook.categoryId === filterCategory)
    //   book.push(...result)
    // }

    // book.push(...arrBook)
    if (filterAuthor === "" && filterPublisher === "" && filterType === "" && filterCategory === "") {
      book.push(...filter)
    }

    if (filterAuthor !== "") {
      if (book.length !== 0) {
        let result = book.filter(book => book.authorId === filterAuthor)
        result.length === 0 ? book = [] :
          book.push(...result)
        console.log("result: ", result)

      } else {
        let result = arrBook.filter(arrBook => arrBook.authorId === filterAuthor)
        result.length === 0 ? book = [] :
          book.push(...result)
      }

      if (filterPublisher !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

      if (filterType !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)
        }
      }
      if (filterCategory !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.categoryId === filterCategory)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.categoryId === filterCategory)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

    }
    
    if (filterPublisher !== "") {
      if (book.length === 0) {
        let result = arrBook.filter(arrBook => arrBook.publisherId === filterPublisher)
        result.length === 0 ? book = [] :
          book.push(...result)
      } else {
        let result = book.filter(arrBook => arrBook.publisherId === filterPublisher)
        result.length === 0 ? book = [] :
          book.push(...result)
      }

      if (filterAuthor !== "") {
        if (book.length !== 0) {
          let result = book.filter(book => book.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)

        } else {
          let result = arrBook.filter(arrBook => arrBook.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

      if (filterType !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)
        }
      }

      if (filterCategory !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.categoryId === filterCategory)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.categoryId === filterCategory)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }
    }
    
    if (filterType !== "") {
      if (book.length === 0) {
        let result = arrBook.filter(arrBook => arrBook.typeId === filterType)
        result.length === 0 ? book = [] :
          book.push(...result)
      } else {
        let result = book.filter(arrBook => arrBook.typeId === filterType)
        result.length === 0 ? book = [] :
          book.push(...result)
        console.log("result: ", result)
      }

      if (filterAuthor !== "") {
        if (book.length !== 0) {
          let result = book.filter(book => book.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)

        } else {
           let result = arrBook.filter(arrBook => arrBook.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

      if (filterPublisher !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }
    }
    
    if (filterCategory !== "") {
      if (book.length === 0) {
        let result = arrBook.filter(arrBook => arrBook.categoryId === filterCategory)
        result.length === 0 ? book = [] :
          book.push(...result)
      } else {
        let result = book.filter(arrBook => arrBook.categoryId === filterCategory)
        result.length === 0 ? book = [] :
          book.push(...result)
      }

      if (filterAuthor !== "") {
        if (book.length !== 0) {
          let result = book.filter(book => book.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)

        } else {
          let result = arrBook.filter(arrBook => arrBook.authorId === filterAuthor)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

      if (filterPublisher !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.publisherId === filterPublisher)
          result.length === 0 ? book = [] :
            book.push(...result)
        }
      }

      if (filterType !== "") {
        if (book.length === 0) {
          let result = arrBook.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
        } else {
          let result = book.filter(arrBook => arrBook.typeId === filterType)
          result.length === 0 ? book = [] :
            book.push(...result)
          console.log("result: ", result)
        }
      }
      // this.render()
    }

    book = Array.from(new Set(book))
    console.log(book)


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
            <div>
              <button
                className="button"
                id="toggler"
                style={{
                  width: "auto",
                  textAlign: "center",
                  marginBottom: "1rem",
                  fontSize: "14px",
                }}>
                <i class="fas fa-filter"></i> Filter
              </button>
            </div>
            <UncontrolledCollapse toggler="#toggler">
              <div className="search_book">
                <Row>
                  <Col md={6} >
                    <Label style={{ padding: "0.5em 0" }}>Search book</Label>
                    <Select
                      isClearable={true}
                      onChange={this.handleOnChangeSeachBook}
                      options={
                        arrBook &&
                        arrBook.map((item, index) => {
                          return { value: item.id, label: item.name };
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row>

                  <Col md={6} >
                    <Label style={{ padding: "0.5em 0" }} >Filter author</Label>
                    <Select
                      isClearable={true}
                      placeholder="Search book by author"
                      onChange={this.handleOnChangeFilterAuthor}
                      options={
                        arrAuthor &&
                        arrAuthor.map((item, index) => {
                          return { value: item.id, label: item.name };
                        })
                      }
                    />
                  </Col>
                  <Col md={6} >
                    <Label style={{ padding: "0.5em 0" }}>Filter publisher</Label>
                    <Select
                      // isClearable={true}
                      isDisabled={this.isDisable}
                      // defaultValue={filterPublisher === "" ? null : filterPublisher}
                      placeholder="Search book by publisher"
                      onChange={this.handleOnChangeFilterPublisher}
                      options={
                        arrPublisher &&
                        arrPublisher.map((item, index) => {
                          return { value: item.id, label: item.name };
                        })
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <Label style={{ padding: "0.5em 0" }}>Filter category book</Label>
                    <Select
                      isClearable={true}
                      placeholder="Search book by category"
                      onChange={this.handleOnChangeFilterCategory}
                      options={
                        arrCategory &&
                        arrCategory.map((item, index) => {
                          return { value: item.id, label: item.name };
                        })
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <Label style={{ padding: "0.5em 0" }}>Filter type book</Label>
                    <Select
                      isClearable={true}
                      placeholder="Search book by type book"
                      onChange={this.handleOnChangeFilterType}
                      options={
                        arrType &&
                        arrType.map((item, index) => {
                          return { value: item.id, label: item.name };
                        })
                      }
                    />
                  </Col>
                </Row>
                {/* <div className="button_group">
                  <button onClick={() => this.handleClearFilterBook()} className="buttonDelete">Clear</button>
                  <button className="button">Filter</button>
                </div> */}
              </div>
            </UncontrolledCollapse>
          </div>
          <div className="center_body">
            <div className="content_body ">
              {book &&
                book.length > 0 &&
                book.map((item, index) => {
                  let image64 = "";
                  if (item.image) {
                    image64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );

                  }
                  return (
                    <Card
                      key={index}
                      className="card_container"
                      style={{ width: "200px" }}
                    >
                      <div
                        className="card_image"
                        style={{ width: "100%", height: "200px" }}
                      >
                        <img
                          className="preview_image_book"
                          style={{ width: "100%", height: "200px" }}
                          src={image64 ? image64 : ""}
                        />
                        <div className="card_tag">
                          <div className="tag_type">{item.typeData.name}</div>
                          <div className="tag_category">
                            {item.categoryData.name}
                          </div>
                        </div>
                        <div style={item.discount === 0 ? { display: "none" } : { display: "block" }} className="card_tag_discount">
                          <img className="tag_discount" src={labelDiscount} />
                          <div className="tag_text_discount">{Math.floor(item.discount * 100) + "%"}</div>
                        </div>
                      </div>
                      <CardBody className="card_body">
                        <CardTitle className="card_title" tag="h6">
                          {item.name}
                        </CardTitle>
                        <CardSubtitle className="card_price" tag="h5">
                          <CurrencyFormat
                            value={Math.floor(item.price - (item.price * item.discount))}
                            placeholder="xxx.xxx VND"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VND"}
                            renderText={(value) => <div className="price_discounted">{value}</div>}
                          />
                          <CurrencyFormat
                            value={item.price}
                            placeholder="xxx.xxx VND"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VND"}
                            renderText={(value) => <div style={item.discount === 0 ? { display: "none" } : { display: "block" }} className="price_main">{value}</div>}
                          />
                        </CardSubtitle>
                        <CardSubtitle
                          className="card_subtitle"
                          style={{ marginBottom: "0.5em" }}
                          tag="h6"
                        >
                          <i class="fas fa-user-edit"></i>
                          {" - "}
                          {item.authorData.name}
                        </CardSubtitle>
                        <CardSubtitle
                          className="card_subtitle"
                          style={{ marginBottom: "0.5em" }}
                          tag="h6"
                        >
                          <i class="fas fa-truck-loading"></i>
                          {" - "}
                          {item.publisherData.name}
                        </CardSubtitle>
                        <div className="group_button">
                          <Button
                            onClick={() => this.handleDetailBook(item)}
                            className="btn_detail"
                          >
                            <i class="fas fa-eye"></i>
                          </Button>
                          <Button
                            onClick={() => this.handleEditBook(item)}
                            className="btn_edit"
                          >
                            <i class="far fa-edit"></i>
                          </Button>
                          <Button
                            onClick={() => this.handleDeleteBook(item)}
                            className="btn_delete"
                          >
                            <i class="fas fa-trash"></i>
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageBook)
);
