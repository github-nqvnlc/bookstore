import React, { Component } from "react";
  
  
import { toast } from "react-toastify";
import CommonUtils from "../../../../utils/CommonUtils";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import imageUpload from "../../../../assets/image_upload.png"
import {
    Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import CurrencyFormat from 'react-currency-format';

class ModalEditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            //book
            id: "",
            name: "",
            description: "",


            previewUrlImage: "",

            category: [],
        };
    }
    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.categoryEdit !== this.props.categoryEdit) {
            let category = this.props.categoryEdit
            console.log(category)
            this.setState({
                id: category.id,
                name: category.name,
                description: category.description
            })
        }
     }

    toggle = () => {
        this.props.toggleModal();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "name",
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

    handleEditCategory = () => {
        let isValid = this.checkValidInput()
        if (isValid === false) return;
        this.toggle()

        this.props.editCategoryRedux({
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        })
    }

   

    render() {
        let {
            name,
            description,
        } = this.state;

        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered

                >
                    <ModalHeader toggle={() => this.toggle()}>Edit Category</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ width: "100%", }}>
                            <Label>Name Category</Label>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn_create" onClick={() => this.handleEditCategory()}>
                            Edit Category
                        </Button>
                        <Button className="btn_cancel" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
         
        category: state.manager.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editCategoryRedux: (data) => dispatch(actions.editCategory(data)),
        getCategory: (id) => dispatch(actions.getCategory(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCategory);
