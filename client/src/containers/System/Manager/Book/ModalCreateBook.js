/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-dupe-keys */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { toast } from "react-toastify";
import CommonUtils from "../../../../utils/CommonUtils";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import imageUpload from "../../../../assets/image_upload.png";
import "./ModalCreateBook.scss";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import Lightbox from "react-image-lightbox";
import CurrencyFormat from "react-currency-format";

class ModalCreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      //book
      name: "",
      description: "",
      author: "",
      authorName: null,
      publisher: "",
      publisherName: null,
      category: "",
      categoryName: null,
      typeBook: "",
      typeName: null,
      price: "",
      discount: "",
      quantity: "",
      image: "",

      previewUrlImage: "",

      arrbook: [],
      arrAuthor: [],
      arrPublisher: [],
      arrCategory: [],
      arrType: [],
      //handle image
      isOpen: false,
      isOpenPreview: false,
      previewImage: "",
    };
  }
  componentDidMount() {
    this.props.getAuthor();
    this.props.getPublisher();
    this.props.getCategory();
    this.props.getType();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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

    if (prevProps.book !== this.props.book) {
      this.setState({
        name: "",
        description: "",
        author: "",
        authorName: null,
        publisher: "",
        publisherName: null,
        category: "",
        categoryName: null,
        typeBook: "",
        typeName: null,
        price: "",
        discount: "",
        quantity: "",
        image: "",

        previewUrlImage: "",
      });
    }
  }

  toggle = () => {
    this.props.toggleModal();
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

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
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

  handleCreateNewBook = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;

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
    if (this.state.authorName && this.state.authorName !== null) {
      this.props.createAuthor({
        name: this.state.authorName,
      });
    }
    if (this.state.publisherName && this.state.publisherName !== null) {
      this.props.createPublisher({
        name: this.state.publisherName,
      });
    }
    if (this.state.categoryName && this.state.categoryName !== null) {
      this.props.createCategory({
        name: this.state.categoryName,
      });
    }
    if (this.state.typeName && this.state.typeName !== null) {
      this.props.createType({
        name: this.state.typeName,
      });
    }

    this.toggle();
  };

  openPreviewImage = (image) => {
    this.setState({
      isOpen: true,
      previewImage: image,
    });
  };

  handleChangeAuthor = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (Value === null) {
      this.setState({
        author: "",
        authorName: null,
      });
      return;
    }
    if (actionMeta.action === "create-option") {
      let id = this.props.authorCountCreated + 1;
      this.setState({
        author: id,
        authorName: Value.label,
      });
    } else {
      this.setState({
        author: Value.value,
      });
    }
  };

  handleChangePublisher = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (Value === null) {
      return;
    }
    if (actionMeta.action === "create-option") {
      let id = this.props.publisherCountCreated + 1;
      this.setState({
        publisher: id,
        publisherName: Value.label,
      });
    } else {
      this.setState({
        publisher: Value.value,
      });
    }
  };

  handleChangeCategory = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (Value === null) {
      return;
    }
    if (actionMeta.action === "create-option") {
      let id = this.props.categoryCountCreated + 1;
      this.setState({
        category: id,
        categoryName: Value.label,
      });
    } else {
      this.setState({
        category: Value.value,
      });
    }
  };

  handleChangeTypeBook = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (Value === null) {
      return;
    }
    if (actionMeta.action === "create-option") {
      let id = this.props.typeCountCreated + 1;
      this.setState({
        typeBook: id,
        typeName: Value.label,
      });
    } else {
      this.setState({
        typeBook: Value.value,
      });
    }
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

    let arrAuthor = this.state.arrAuthor;
    let arrPublisher = this.state.arrPublisher;
    let arrCategory = this.state.arrCategory;
    let arrType = this.state.arrType;

    console.log(
      "author",
      this.props.authorCountCreated,
      "publisher",
      this.props.publisherCountCreated,
      "category",
      this.props.categoryCountCreated,
      "type",
      this.props.typeCountCreated
    );
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create New Book
          </ModalHeader>
          <ModalBody>
            <FormGroup className="form_group_header">
              <FormGroup className="form_group_image">
                <img
                  src={
                    this.state.previewUrlImage
                      ? this.state.previewUrlImage
                      : imageUpload
                  }
                  className="preview_image_book"
                  onClick={() => this.openPreviewImage()}
                />
                <Label className="button_create" htmlFor="imageUpload">
                  Upload Image
                </Label>
                <Input
                  type="file"
                  id="imageUpload"
                  onChange={(event) => this.handleOnChangeImage(event)}
                  hidden
                />
              </FormGroup>
              <FormGroup style={{ width: "100%" }}>
                <Label>Name Book</Label>
                <Input
                  onChange={(e) => this.handleOnChangeInput(e, "name")}
                  value={name}
                  className="input_focus_book input_hover_book"
                />

                <Label>Description</Label>
                <Input
                  onChange={(e) => this.handleOnChangeInput(e, "description")}
                  value={description}
                  className="input_focus_book input_hover_book"
                  style={{ height: "225px" }}
                  type="textarea"
                />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>

              <CreatableSelect
                isClearable
                onChange={this.handleChangeAuthor}
                options={
                  arrAuthor &&
                  arrAuthor.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })
                }
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Publisher</Label>
              <CreatableSelect
                isClearable
                onChange={this.handleChangePublisher}
                options={
                  arrPublisher &&
                  arrPublisher.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })
                }
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                onChange={(e) => this.handleOnChangeInput(e, "price")}
                value={price}
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Discount</Label>
              <Input
                onChange={(e) => this.handleOnChangeInput(e, "discount")}
                value={discount}
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <CreatableSelect
                isClearable
                onChange={this.handleChangeCategory}
                options={
                  arrCategory &&
                  arrCategory.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })
                }
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Type Book</Label>
              <CreatableSelect
                isClearable
                onChange={this.handleChangeTypeBook}
                options={
                  arrType &&
                  arrType.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })
                }
                className="input_focus_book input_hover_book"
              />
            </FormGroup>

            <FormGroup>
              <Label>Quantity</Label>
              <Input
                onChange={(e) => this.handleOnChangeInput(e, "quantity")}
                value={quantity}
                className="input_focus_book input_hover_book"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn_create"
              onClick={() => this.handleCreateNewBook()}
            >
              Create
            </Button>
            <Button className="btn_cancel" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.isOpenPreview === true && (
          <Lightbox
            mainSrc={this.state.previewUrlImage}
            onCloseRequest={() => {
              this.setState({ isOpenPreview: false });
              this.toggle();
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
    author: state.manager.author,
    authorCountCreated: state.manager.authorCountCreated,
    publisher: state.manager.publisher,
    publisherCountCreated: state.manager.publisherCountCreated,
    category: state.manager.category,
    categoryCountCreated: state.manager.categoryCountCreated,
    type: state.manager.type,
    typeCountCreated: state.manager.typeCountCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
    getBook: (id) => dispatch(actions.getBook(id)),
    getAuthor: () => dispatch(actions.getAuthor("ALL")),
    getPublisher: () => dispatch(actions.getPublisher("ALL")),
    getCategory: () => dispatch(actions.getCategory("ALL")),
    getType: () => dispatch(actions.getType("ALL")),
    createAuthor: (data) => dispatch(actions.createAuthor(data)),
    createPublisher: (data) => dispatch(actions.createPublisher(data)),
    createCategory: (data) => dispatch(actions.createCategory(data)),
    createType: (data) => dispatch(actions.createType(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBook);
