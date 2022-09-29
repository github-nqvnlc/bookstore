import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./ManageBook.scss";
import SideContent from "../SideContent/SideContent";
import SideBar from "../SideBar/SideBar";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import CurrencyFormat from 'react-currency-format';
import ModalCreateBook from "./ModalCreateBook";

class ManageBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,

      isOpen: false,
      previewImage: "",
      book: [],
    };
  }
  componentDidMount() {
    this.props.getBook("ALL")
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.book !== this.props.book) {
      this.setState({
        book: this.props.book
      })
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
    })
  }

  handleDeleteBook = (book) => {
    this.props.deleteBook(book.id)
  }

  render() {
    let arrBook = this.state.book
    console.log(arrBook)
    return (
      <div>
        <div className="title">
          Manage Book
        </div>
        <div className="section_body container">
          <ModalCreateBook
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
          />
          <div className="content_header">
            <button
              onClick={() => this.handleCreateBook()}
              className="button_create"
              style={{
                marginBottom: "1rem",
                fontSize: "14px"
              }}
            >
              <i class="fas fa-plus"></i> Create new book
            </button>
          </div>
          <div className="center_body">
            <div className="content_body ">
              {arrBook && arrBook.length > 0 && arrBook.map((item, index) => {
                let image64 = ''
                if (item.image) {
                  image64 = new Buffer(item.image, 'base64').toString('binary')
                }
                return (
                  <Card key={index} className="card_container" style={{ width: "200px", }}>
                    <img className="preview_image_book" style={{ width: "200px", height: "200px" }} src={image64 ? image64 : ''} />
                    <CardBody className="card_body">
                      <CardTitle className="card_title" tag="h4">{item.name}</CardTitle>
                      <CardSubtitle className="card_price" tag="h5">
                        <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value => <div>{value}</div>} />
                      </CardSubtitle>
                      <CardSubtitle className="card_subtitle" style={{ marginBottom: "0.5em" }} tag="h6"><i class="fas fa-user-edit"></i>{' - '}{item.authorData.name}</CardSubtitle>
                      <CardSubtitle className="card_subtitle" style={{ marginBottom: "0.5em" }} tag="h6"><i class="fas fa-truck-loading"></i>{' - '}{item.publisherData.name}</CardSubtitle>
                      <div className="group_button">
                        <Button className="btn_detail" ><i class="fas fa-eye"></i></Button>
                        <Button className="btn_edit" ><i class="far fa-edit"></i></Button>
                        <Button onClick={()=>this.handleDeleteBook(item)} className="btn_delete" ><i class="fas fa-trash"></i></Button>
                      </div>
                    </CardBody>
                  </Card>
                )
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
    book: state.manager.book
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (id) => dispatch(actions.getBook(id)),
    deleteBook: (id) => dispatch(actions.deleteBook(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
