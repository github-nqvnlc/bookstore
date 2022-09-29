import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { toast } from "react-toastify";
import CommonUtils from "../../../../utils/CommonUtils";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import imageUpload from "../../../../assets/image_upload.png"
import "./ModalCreateBook.scss";
import Select from 'react-select';
import {
    Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import Lightbox from "react-image-lightbox";
import CurrencyFormat from 'react-currency-format';

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

            previewUrlImage: "",

            author: [],
            publisher: [],
            category: [],
            type: [],
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
                author: this.props.author
            })
        }
        if (prevProps.publisher !== this.props.publisher) {
            this.setState({
                publisher: this.props.publisher
            })
        }
        if (prevProps.category !== this.props.category) {
            this.setState({
                category: this.props.category
            })
        }
        if (prevProps.type !== this.props.type) {
            this.setState({
                type: this.props.type
            })
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
            publisherId: this.state.publisher,
            categoryId: this.state.category,
            typeId: this.state.typeBook,
            price: this.state.price,
            discount: this.state.discount,
            quantity: this.state.quantity,
            image: this.state.image,
        });
        this.toggle()
    }

    openPreviewImage = (image) => {
        this.setState({
            isOpen: true,
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

        let arrAuthor = this.state.author
        console.log(arrAuthor)
        

        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered

                >
                    <ModalHeader toggle={() => this.toggle()}>Create New Book</ModalHeader>
                    <ModalBody>
                        <FormGroup className="form_group_header">
                            <FormGroup className="form_group_image">
                                <img
                                    src={this.state.previewUrlImage ? this.state.previewUrlImage : imageUpload}
                                    className="preview_image_book"
                                    onClick={() => this.openPreviewImage()}
                                />
                                <Label
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
                            <FormGroup style={{ width: "100%", }}>
                                <Label>Name Book</Label>
                                <Input
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "name")
                                    }
                                    value={name}
                                    className="input_focus_book input_hover_book"
                                />

                                <Label>Description</Label>
                                <Input
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "description")
                                    }
                                    value={description}
                                    className="input_focus_book input_hover_book"
                                    style={{ height: "225px" }}
                                    type="textarea"
                                />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>Author</Label>
                            <Select
                                onChangeInput={(e) =>
                                    this.handleOnChangeInput(e, "author")
                                }
                                value={author}
                                options={arrAuthor && arrAuthor.length > 0 && arrAuthor.map((item, index) => {
                                    return ({ value: item.id, label: item.name })
                                })}
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

                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn_create" onClick={() => this.handleCreateNewBook()}>
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
            </div >
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBook);
