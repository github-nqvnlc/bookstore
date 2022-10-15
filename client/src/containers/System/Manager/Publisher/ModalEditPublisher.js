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

class ModalEditPublisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            //book
            id: "",
            name: "",
            description: "",


            previewUrlImage: "",

            publisher: [],
        };
    }
    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.publisherEdit !== this.props.publisherEdit) {
            let publisher = this.props.publisherEdit
            console.log(publisher)
            this.setState({
                id: publisher.id,
                name: publisher.name,
                description: publisher.description
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

    handleEditPublisher = () => {
        let isValid = this.checkValidInput()
        if (isValid === false) return;
        this.toggle()

        this.props.editPublisherRedux({
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
                    <ModalHeader toggle={() => this.toggle()}>Edit Publisher</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ width: "100%", }}>
                            <Label>Name Publisher</Label>
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
                        <Button className="btn_create" onClick={() => this.handleEditPublisher()}>
                            Edit Publisher
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
         
        publisher: state.manager.publisher,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editPublisherRedux: (data) => dispatch(actions.editPublisher(data)),
        getPublisher: (id) => dispatch(actions.getPublisher(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPublisher);
