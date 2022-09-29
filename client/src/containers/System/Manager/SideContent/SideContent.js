/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import { toast } from "react-toastify";
import "./SideContent.scss";
import imageUpload from "../../../../assets/image_upload.png"

import {
  Collapse,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardTitle,
  CardFooter,
} from "reactstrap";
import CommonUtils from "../../../../utils/CommonUtils";
import Lightbox from "react-image-lightbox";

class SideContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenPreview: false,
      name: "",
      description: "",
      author: "",
      publisher: "",
      category: "",
      typeBook: "",
      price: "",
      discount: "",
      quantity: "",
      image: "",

      previewUrlImage: "",

      book: []
    };
  }
  componentDidMount() {
    this.props.getBook("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.book !== this.props.book) {
      this.setState({
        book: this.props.book,
        name: "",
        description: "",
        author: "",
        publisher: "",
        category: "",
        typeBook: "",
        price: "",
        discount: "",
        quantity: "",
        image: "",

        previewUrlImage: "",
      })
    }
  }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidInput = () => {
    let isValid = true;
    let arrInput = [
      "image",
      "name",
      "author",
      "category",
      "publisher",
      "typeBook",
      "price",
      "quantity",
    ];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Missing input: ${arrInput[i]}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        break;
      }
    }
    return isValid;
  };

  handleCreateNewBook = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;
    this.toggle();
    //fire redux
    this.props.createNewBook({
      name: this.state.name,
      description: this.state.description,
      authorId: this.state.author,
      publisherId: this.state.publisher,
      categoryId: this.state.category,
      typeId: this.state.typeBook,
      price: this.state.price,
      discount: this.state.discount,
      quantity: this.state.quantity,
      image: this.state.image,
    });
  };

  handleDeleteBook = (book) => {
    this.props.deleteBook(book.id)
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let imageUrl = URL.createObjectURL(file);
      this.setState({
        previewUrlImage: imageUrl,
        image: base64,
      });
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  openPreviewImage = (image) => {
    this.setState({
      isOpenPreview: true,
      previewImage: image,
    });
  };

  render() {
    let {
      name,
      description,
      author,
      publisher,
      category,
      typeBook,
      price,
      discount,
      quantity,
    } = this.state;

    let arrBook = this.state.book;
    console.log(arrBook)
    return (
      <div className="sidecontent">
        <div className="sidecontent_header">Manage Book</div>
        <div className="sidecontent_body">
          <div className="body_header">
            <button
              onClick={this.toggle}
              className="button_create"
              style={{
                marginBottom: "1rem",
              }}
            >
              Create new book
            </button>
            <Collapse isOpen={this.state.isOpen}>
              <Card style={{ border: "none", boxShadow: " 0 0 5px #b3b3b3" }}>
                <CardBody style={{ witdh: "100%" }}>
                  <Row md={12}>
                    <Col xl={3} lg={3} md={3} sm={4} xs={12}>
                      <FormGroup>
                        <img
                          style={{ width: "100%", height: "300px" }}
                          src={this.state.previewUrlImage ? this.state.previewUrlImage : imageUpload}
                          className="preview_image"
                          onClick={() => this.openPreviewImage()}
                        />
                        <Label
                          style={{ margin: "1em 0", width: "100%" }}
                          className="button_create"
                          htmlFor="imageUpload"
                        >
                          Upload Image
                        </Label>
                        <Input
                          type="file"
                          id="imageUpload"
                          onChange={(event) => this.handleOnChangeImage(event)}
                          hidden
                        />
                      </FormGroup>
                    </Col>
                    <Col xl={9} lg={9} md={9} sm={8} xs={12}>
                      <Row>
                        <Col lg={6}>
                          <FormGroup>
                            <Label>Name Book</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "name")
                              }
                              value={name}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Description</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "description")
                              }
                              value={description}
                              className="input_focus_book input_hover_book"
                              style={{ height: "200px" }}
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={3}>
                          <FormGroup>
                            <Label>Author</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "author")
                              }
                              value={author}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Publisher</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "publisher")
                              }
                              value={publisher}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Price</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "price")
                              }
                              value={price}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Discount</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "discount")
                              }
                              value={discount}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={3}>
                          <FormGroup>
                            <Label>Category</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "category")
                              }
                              value={category}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Type Book</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "typeBook")
                              }
                              value={typeBook}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Quantity</Label>
                            <Input
                              onChange={(e) =>
                                this.handleOnChangeInput(e, "quantity")
                              }
                              value={quantity}
                              className="input_focus_book input_hover_book"
                            />
                          </FormGroup>
                          
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <Card style={{ border: "none", alignItems: "flex-end" }}>
                  <button
                    onClick={() => {
                      this.handleCreateNewBook();
                    }}
                    className="button_create"
                    style={{ width: "5em", margin: "1em" }}
                  >
                    Create
                  </button>
                </Card>
              </Card>
            </Collapse>
          </div>
          <div className="body_list_book">
            <Row>
              {arrBook && arrBook.length > 0 &&
                arrBook.map((item, index) => {
                  let image = '';
                  if (item.image) { image = new Buffer(item.image, 'base64').toString('binary') }
                  return (
                    <Col
                      key={index}
                      // xl={2}
                      // lg={4}
                      // md={6}
                      // sm={6}
                      // xs={6}
                      style={{ marginBottom: "2em" }}
                    >
                      <Card
                        style={{
                          border: "none",
                          boxShadow: " 0 0 5px #b3b3b3",
                        }}
                        className="card_book"
                      >
                        <Row>
                          <Col xl={12} lg={12} md={12}>
                            <div className="card_image">
                              <img
                                className="preview_image"
                                src={image ? image : imageUpload}
                                onClick={() => this.openPreviewImage(image)}
                              />
                              <span className="type_book">{item.typeId}</span>
                              <span className="category">{item.categoryData.name}</span>
                            </div>
                          </Col>
                          <Col>
                            <div className="card_content">
                              <div className="card_header">{item.name}álkdaskldjlsakdjaslkdjaskld</div>
                              <div className="card_body">
                                <p className="card_text"><span className="card_text_bold">Author: </span>{item.authorId}</p>
                                <p className="card_text"><span className="card_text_bold">Publisher: </span>{item.publisherId} </p>
                                <p className="card_text"><span className="card_text_bold">Price: </span>{item.price} </p>
                                
                              </div>
                              <div className="card_footer">
                                <button className="card_edit">Edit book</button>
                                <button className="card_detail">View detail</button>
                                <button onClick={() => this.handleDeleteBook(item)} className="card_delete">Delete book</button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  )
                })}
            </Row>
          </div>
        </div>
        {this.state.isOpenPreview === true && (
          <Lightbox
            mainSrc={this.state.previewUrlImage}
            onCloseRequest={() => {
              this.setState({ isOpenPreview: false });
              //   this.toggle();
            }}
            className="preview_lightbox"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    book: state.manager.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
    getBook: (id) => dispatch(actions.getBook(id)),
    deleteBook: (id) => dispatch(actions.deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideContent);
