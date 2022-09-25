/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import "./SideContent.scss";

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
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

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
        alert("Missing input: " + arrInput[i]);
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
    // let arrRole = this.state.role;
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
                          src={this.state.previewUrlImage}
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
                          <FormGroup>
                            <Label>Number Like</Label>
                            <Input
                              disabled
                              className="input_focus_book input_hover_book"
                              value={3}
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
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={6}
                xs={6}
                style={{ marginBottom: "2em" }}
              >
                <Card
                  style={{
                    border: "none",
                    boxShadow: " 0 0 5px #b3b3b3",
                  }}
                >
                  <Row>
                    <Col xl={12} lg={12} md={5}>
                      <div className="card_image">
                        <img
                          className="preview_image"
                          src="https://nhasachphuongnam.com/images/thumbnails/213/213/detailed/234/harry-potter-va-dua-tre-bi-nguyen-rua-tb-2022.jpg"
                        />
                        <span className="type_book">Vietnamese Book</span>
                        <span className="category">Novel</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="card_content">
                        <div className="card_header">Harry Potter</div>
                        <div className="card_body">
                          <Row style={{ width: "100%" }}>
                            <div className="card_text_bold col-xl-4 col-lg-4 col-md-5 col-sm-4  ">
                              Author
                            </div>
                            <div className="card_text col-xl-8 col-lg-8 col-md-7 col-sm-8 col-sm-8 ">
                              J.K Rowling{" "}
                            </div>
                          </Row>
                          <Row style={{ width: "100%" }}>
                            <div className="card_text_bold col-xl-4 col-lg-4 col-md-5 col-sm-4 ">
                              Publisher:{" "}
                            </div>
                            <div className="card_text col-xl-8 col-lg-8 col-md-7 col-sm-8 col-sm-8 ">
                              laskdjakldjaldjaksdjaljd
                            </div>
                          </Row>

                          <Row style={{ width: "100%" }}>
                            <div className="card_text_bold col-xl-4 col-lg-4 col-md-5 col-sm-4 ">
                              Price:{" "}
                            </div>
                            <div className="card_text col-xl-8 col-lg-8 col-md-7 col-sm-8 col-sm-8 ">
                              200000
                            </div>
                          </Row>
                        </div>
                        <div className="card_footer">
                          <button className="card_edit">Edit book</button>
                          <button className="card_detail">View detail</button>
                          <button className="card_delete">Delete book</button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideContent);
