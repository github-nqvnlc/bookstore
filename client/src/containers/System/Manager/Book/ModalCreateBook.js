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
import { NumericFormat } from "react-number-format";
import CustomScrollbars from "../../../../components/CustomScrollbars";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ModalCreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      //book
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

      //format number
      formatPrice: "",
      formatDiscount: "",
      //get by name props
      authorByName: {},
      publisherByName: {},
      categoryByName: {},
      typeByName: {},

      previewUrlImage: "",

      arrbook: [],
      arrAuthor: [],
      arrPublisher: [],
      arrCategory: [],
      arrType: [],

      isLoading: false,
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

    // get by name
    if (prevProps.authorByName !== this.props.authorByName) {
      this.setState({
        authorByName: this.props.authorByName,
      });
    }

    if (prevProps.publisherByName !== this.props.publisherByName) {
      this.setState({
        publisherByName: this.props.publisherByName,
      });
    }

    if (prevProps.categoryByName !== this.props.categoryByName) {
      this.setState({
        categoryByName: this.props.categoryByName,
      });
    }

    if (prevProps.typeByName !== this.props.typeByName) {
      this.setState({
        typeByName: this.props.typeByName,
      });
    }

    //reset state
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

        formatPrice: "",
        formatDiscount: "",
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

    this.toggle();
  };

  openPreviewImage = (image) => {
    this.toggle();
    this.setState({
      isOpenPreview: true,
      previewImage: image,
    });
  };

  handleChangeAuthor = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (actionMeta.action === "create-option") {
      this.setState({ isLoading: true });
      this.props.createAuthor({
        name: Value.label,
      });
      setTimeout(() => {
        this.setState({
          author: this.props.authorByName.id,
          isLoading: false,
        });
      }, 3000);
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        author: Value.value,
      });
    }
  };

  handleChangePublisher = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (actionMeta.action === "create-option") {
      this.setState({ isLoading: true });
      this.props.createPublisher({
        name: Value.label,
      });
      setTimeout(() => {
        this.setState({
          publisher: this.props.publisherByName.id,
          isLoading: false,
        });
      }, 3000);
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        publisher: Value.value,
      });
    }
  };

  handleChangeCategory = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (actionMeta.action === "create-option") {
      this.setState({ isLoading: true });
      this.props.createCategory({
        name: Value.label,
      });
      setTimeout(() => {
        this.setState({
          category: this.props.categoryByName.id,
          isLoading: false,
        });
      }, 3000);
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        category: Value.value,
      });
    }
  };

  handleChangeTypeBook = (Value, actionMeta) => {
    console.log("new value: ", Value);
    console.log(`action: ${actionMeta.action}`);
    if (actionMeta.action === "create-option") {
      this.setState({ isLoading: true });
      this.props.createType({
        name: Value.label,
      });
      setTimeout(() => {
        this.setState({
          typeBook: this.props.typeByName.id,
          isLoading: false,
        });
      }, 3000);
    }
    if (actionMeta.action === "select-option") {
      this.setState({
        typeBook: Value.value,
      });
    }
  };

  render() {
    let { name, description, formatPrice, formatDiscount, quantity } =
      this.state;

    let arrAuthor = this.state.arrAuthor;
    let arrPublisher = this.state.arrPublisher;
    let arrCategory = this.state.arrCategory;
    let arrType = this.state.arrType;

    return (
      <CustomScrollbars>
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
                  onClick={() =>
                    this.openPreviewImage(
                      this.state.previewUrlImage && this.state.previewUrlImage
                    )
                  }
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
                <Label>Author</Label>
                <CreatableSelect
                  isClearable
                  isDisabled={this.state.isLoading}
                  isLoading={this.state.isLoading}
                  onChange={this.handleChangeAuthor}
                  options={
                    arrAuthor &&
                    arrAuthor.map((item, index) => {
                      return { value: item.id, label: item.name };
                    })
                  }
                  className="input_focus_book input_hover_book"
                />
                <Label>Publisher</Label>
                <CreatableSelect
                  isClearable
                  isDisabled={this.state.isLoading}
                  isLoading={this.state.isLoading}
                  onChange={this.handleChangePublisher}
                  options={
                    arrPublisher &&
                    arrPublisher.map((item, index) => {
                      return { value: item.id, label: item.name };
                    })
                  }
                  className="input_focus_book input_hover_book"
                />
                <Label>Price</Label>
                <NumericFormat
                  className="form-control input_focus_book input_hover_book"
                  value={formatPrice}
                  thousandsGroupStyle="thousands"
                  thousandSeparator=","
                  suffix={" VND"}
                  displayType="Input"
                  isAllowed={(values, sourceInfo) => {
                    values.value > 100000000 &&
                      toast.error("Price is not more than 100.000.000 VND", {
                        position: "bottom-right",
                        autoClose: 3000,
                      });
                    return values.value < 100000000;
                  }}
                  onValueChange={(values, sourceInfo) => {
                    this.setState({
                      price: values.value,
                      formatPrice: values.formattedValue,
                    });
                  }}
                  renderText={(value) => <b>{value}</b>}
                />
                <Label>Discount</Label>
                <NumericFormat
                  className="form-control input_focus_book input_hover_book"
                  value={formatDiscount}
                  thousandsGroupStyle="thousands"
                  thousandSeparator=","
                  suffix={" %"}
                  displayType="Input"
                  isAllowed={(values, sourceInfo) => {
                    values.value > 100 &&
                      toast.error("Discount is not more than 100%", {
                        position: "bottom-right",
                        autoClose: 3000,
                      });
                    return values.value <= 100;
                  }}
                  onValueChange={(values, sourceInfo) => {
                    let discounted = values.value / 100;
                    this.setState({
                      discount: discounted,
                      formatDiscount: values.formattedValue,
                    });
                  }}
                  renderText={(value) => <b>{value}</b>}
                />
                {/* <Input
                  onChange={(e) => this.handleOnChangeInput(e, "description")}
                  value={description}
                  className="input_focus_book input_hover_book"
                  style={{ height: "225px" }}
                  type="textarea"
                /> */}
                

              </FormGroup>
            </FormGroup>
          
            <FormGroup>
              <Label>Category</Label>
              <CreatableSelect
                isClearable
                isDisabled={this.state.isLoading}
                isLoading={this.state.isLoading}
                onChange={this.handleChangeCategory}
                options={
                  arrCategory &&
                  arrCategory.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })
                }
                className=" input_focus_book input_hover_book"
              />
            </FormGroup>
            <FormGroup>
              <Label>Type Book</Label>
              <CreatableSelect
                isClearable
                isDisabled={this.state.isLoading}
                isLoading={this.state.isLoading}
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
            <FormGroup>
              <Label>Description</Label>
              <MdEditor
                className="form-control input_focus_book input_hover_book"
                style={{ height: '500px', width: "100%"}}
                value={description}
                renderHTML={text => mdParser.render(text)}
                onChange={({html, text}) => {
                  this.setState({
                    description: text
                  }, () => console.log(this.state.description))
                }}
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
      </CustomScrollbars>
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBook);
