import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./DetailBook.scss";
import Loading from "../../../../components/Loading/Loading";
import { Row, Col, Label, Button } from "reactstrap";
import Lightbox from "react-image-lightbox";
import { NumericFormat } from "react-number-format";
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ModalEditBook from "./ModalEditBook";

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      isLoading: true,
      //book
      id: "",
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

      book: {},
      author: {},
      publisher: {},
      category: {},
      catalog: {},
      type: {},
      bookEdit: {},
      //format number
      formatPrice: "",
      formatDiscount: "",
      //get by name props


      //handle image
      isOpen: false,
      isOpenPreview: false,
      previewImage: "",
      previewUrlImage: "",
    };
  }

  componentDidMount() {

    this.props.getBook(this.props.match.params.id);
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 3000);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let image64 = "";

    if (prevProps.book !== this.props.book) {

      if (this.props.book !== null && this.props.book.image) {
        image64 = new Buffer(this.props.book.image, "base64").toString("binary");
        this.setState({
          book: this.props.book,
          author: this.props.book.authorData,
          publisher: this.props.book.publisherData,
          category: this.props.book.categoryData,
          catalog: this.props.book.catalogData,
          type: this.props.book.typeData,
          previewUrlImage: image64,
        })
      } else {
        this.props.history.push("/system/manager/manage-book")
      }


    }
  }


  toggleModalEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
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
    this.props.history.push("/system/manager/manage-book")
  };

  openPreviewImage = (image) => {
    this.setState({
      isOpenPreview: true,
      previewImage: image,
    }, () => { console.log(this.state.isOpenPreview) });
  };

  render() {



    let { book, author, publisher, category, catalog, type, previewUrlImage, isLoading } = this.state
    let descriptionHTML = new MarkdownIt().render(`${book.description}`)

    return (
      <div>
        <div className="title">Detail Book</div>

        {isLoading === true ?
          <div className="loading container">
            <Loading />
          </div> :
          <div className="detail_container container">
            <ModalEditBook
              isOpen={this.state.isOpenModalEdit}
              toggleModal={this.toggleModalEdit}
              bookEdit={this.state.bookEdit}
              previewImage={this.previewImage}
              checkEdit={"ONE"}
            />
            <Row>
              <Col md={4}>
                <img
                  className="image_detail"
                  src={previewUrlImage ? previewUrlImage : ""}
                  onClick={() => this.openPreviewImage(previewUrlImage)}
                />
                <div className="detail_group_button">
                  <Button
                    onClick={() => this.handleEditBook(book)}
                    className="btn_edit"
                  >
                    <i class="far fa-edit"></i> Edit book
                  </Button>
                  <Button
                    onClick={() => this.handleDeleteBook(book)}
                    className="btn_delete"
                  >
                    <i class="fas fa-trash"></i> Delete book
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="detail_content">
                  <div className="detail_name">
                    <Label tag="h2">{book.name}</Label>
                  </div>
                  <div className="detail_text_group">
                    <div className="detail_item">
                      <p className="text_span">Author:</p>
                      <p className="text_defaul">{author.name}</p>
                    </div>
                    <div className="detail_item">
                      <p className="text_span">Publisher:</p>
                      <p className="text_defaul">{publisher.name}</p>
                    </div>
                  </div>
                  <div className="detail_item_group">
                    <p className="text_span">Type book:</p>
                    <p className="type">{type.name}</p>
                  </div>
                  <div className="detail_item_group">
                    <p className="text_span">Catalog:</p>
                    <p className="type">{catalog.name}</p>
                  </div>
                  <div className="detail_item_group">
                    <p className="text_span">Category:</p>
                    <p className="category">{category.name}</p>
                  </div>
                  <div className="detail_price">
                    {/* <p className="price_discounted">{book.price - (book.price * book.discount)}</p> */}
                    <NumericFormat
                      value={Math.floor(book.price - (book.price * book.discount))}
                      thousandsGroupStyle="thousands"
                      thousandSeparator=","
                      suffix={" VND"}
                      displayType="text"
                      renderText={(value) => <p className="price_discounted">{value}</p>}
                    />
                    <NumericFormat
                      value={book.price}
                      thousandsGroupStyle="thousands"
                      thousandSeparator=","
                      suffix={" VND"}
                      displayType="text"
                      renderText={(value) => <p style={book.discount === 0 ? { display: "none" } : { display: "block" }} className="price_main">{value}</p>}
                    />
                    <NumericFormat
                      value={Math.floor(book.discount * 100)}
                      thousandsGroupStyle="thousands"
                      thousandSeparator=","
                      suffix={" %"}
                      displayType="text"
                      renderText={(value) => <p className="discount">Discount: {value}</p>}
                    />
                  </div>

                  <div className="detail_quantity">
                    <p className="text_span">Quantity: </p>
                    <p className="quantity">{book.quantity}</p>
                  </div>
                  <div className="detail_description">
                    <p className="text_span">Description:</p>
                    <p className="description" dangerouslySetInnerHTML={{ __html: descriptionHTML }}></p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        }
        {this.state.isOpenPreview === true && (
          <Lightbox
            mainSrc={previewUrlImage}
            onCloseRequest={() => {
              this.setState({ isOpenPreview: false });
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
     
    book: state.manager.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (id) => dispatch(actions.getBook(id)),
    deleteBook: (id) => dispatch(actions.deleteBook(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailBook));
