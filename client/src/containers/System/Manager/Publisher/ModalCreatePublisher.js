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

class ModalCreatePublisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            //publisher
            name: "",
            description: "",
        };
    }
    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.publisher !== this.props.publisher) {
            this.setState({
                name: "",
                description: "",
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

    handleCreatePublisher = () => {
        let isValid = this.checkValidInput();
        if (isValid === false) return;
        this.toggle();

        this.props.createNewPublisher({
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
                    <ModalHeader toggle={() => this.toggle()}>Create New Publisher</ModalHeader>
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
                        <Button className="btn_create" onClick={() => this.handleCreatePublisher()}>
                            Create
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
        createNewPublisher: (data) => dispatch(actions.createPublisher(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePublisher);
