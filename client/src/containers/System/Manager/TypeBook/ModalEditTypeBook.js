import React, { Component } from "react";
  
  
import { toast } from "react-toastify";
import CommonUtils from "../../../../utils/CommonUtils";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import CreatableSelect from "react-select/creatable";
import {
    Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import CurrencyFormat from 'react-currency-format';

class ModalEditTypeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isLoading: false,
            //book
            id: "",
            name: "",
            description: "",
            catalog: "",

            previewUrlImage: "",

            catalogTypeData: {},

            //get by name
            catalogByName: {},

            arrCatalog: [],

            typeBook: [],
        };
    }
    componentDidMount() {
        this.props.getCatalog()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.catalog !== this.props.catalog) {
            this.setState({
                arrCatalog: this.props.catalog,
            });
        }

        if (prevProps.catalogByName !== this.props.catalogByName) {
            this.setState({
                catalogByName: this.props.catalogByName,
            });
        }

        if (prevProps.typeBookEdit !== this.props.typeBookEdit) {
            let typeBook = this.props.typeBookEdit
            console.log(typeBook)
            this.setState({
                id: typeBook.id,
                name: typeBook.name,
                description: typeBook.description,
                catalog: typeBook.catalogId,
                catalogTypeData: typeBook.catalogTypeData
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
            "catalog"
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

    handleEditTypeBook = () => {
        let isValid = this.checkValidInput()
        if (isValid === false) return;
        this.toggle()

        this.props.editTypeBook({
            id: this.state.id,
            name: this.state.name,
            catalogId: this.state.catalog,
            description: this.state.description
        })
    }

    handleChangeCatalog = (Value, actionMeta) => {
        console.log("new value: ", Value);
        console.log(`action: ${actionMeta.action}`);
        if (actionMeta.action === "create-option") {
            this.setState({ isLoading: true });
            this.props.createCatalog({
                name: Value.label,
            });
            setTimeout(() => {
                console.log(this.props.catalogByName)
                this.setState({
                    catalog: this.props.catalogByName.id,
                    isLoading: false,
                });
            }, 3000);
        }
        if (actionMeta.action === "select-option") {
            this.setState({
                catalog: Value.value,
            });
        }
    };

    render() {
        let {
            name,
            description,
        } = this.state;
        let arrCatalog = this.state.arrCatalog
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered

                >
                    <ModalHeader toggle={() => this.toggle()}>Edit Type Book</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ width: "100%", }}>
                            <Label>Name Type Book</Label>
                            <Input
                                placeholder="Name type book ..."
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "name")
                                }
                                value={name}
                                className="input_focus_book input_hover_book"
                            />
                            <Label>Catalog</Label>
                            <CreatableSelect
                                isClearable
                                defaultValue={{
                                    value: this.state.catalog,
                                    label: this.state.catalogTypeData.name,
                                }}
                                isDisabled={this.state.isLoading}
                                isLoading={this.state.isLoading}
                                onChange={this.handleChangeCatalog}
                                placeholder="Select or create new category..."
                                options={
                                    arrCatalog &&
                                    arrCatalog.map((item, index) => {
                                        return { value: item.id, label: item.name };
                                    })
                                }
                                className=" input_focus_book input_hover_book"
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
                        <Button className="btn_create" onClick={() => this.handleEditTypeBook()}>
                            Edit Type Book
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
         
        typeBook: state.manager.type,
        catalog: state.manager.catalog,

        catalogByName: state.manager.catalogByName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editTypeBook: (data) => dispatch(actions.editType(data)),
        getTypeBook: (id) => dispatch(actions.getType(id)),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),

        createCatalog: (data) => dispatch(actions.createCatalog(data))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTypeBook);
