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

class ModalCreateCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            //category
            name: "",
            description: "",
            category: "",

            //get by name props
            categoryByName: {},

            arrCategory: [],
            isLoading: false,

        };
    }
    componentDidMount() { this.props.getCategory(); }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.catalog !== this.props.catalog) {
            this.setState({
                name: "",
                description: "",
                category: ""
            })
        }

        if (prevProps.category !== this.props.category) {
            this.setState({
                arrCategory: this.props.category,
            });
        }

        if (prevProps.categoryByName !== this.props.categoryByName) {
            this.setState({
                categoryByName: this.props.categoryByName,
            });
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

    handleCreateCatalog = () => {
        let isValid = this.checkValidInput();
        if (isValid === false) return;
        this.toggle();

        this.props.createNewCatalog({
            name: this.state.name,
            description: this.state.description,
            categoryId: this.state.category
        })
    }

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

    render() {
        let {
            name,
            description,
        } = this.state;
        let arrCategory = this.state.arrCategory;
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered

                >
                    <ModalHeader toggle={() => this.toggle()}>Create New Catalog</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ width: "100%", }}>
                            <Label>Name Catalog</Label>
                            <Input
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "name")
                                }
                                placeholder="Name catalog..."
                                value={name}
                                className="input_focus_book input_hover_book"
                            />
                            <Label>Category</Label>
                            <CreatableSelect
                                isClearable
                                isDisabled={this.state.isLoading}
                                isLoading={this.state.isLoading}
                                onChange={this.handleChangeCategory}
                                placeholder="Select or create new category..."
                                options={
                                    arrCategory &&
                                    arrCategory.map((item, index) => {
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
                        <Button className="btn_create" onClick={() => this.handleCreateCatalog()}>
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
         
        category: state.manager.category,
        catalog: state.manager.catalog,
        categoryByName: state.manager.categoryByName,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewCatalog: (data) => dispatch(actions.createCatalog(data)),

        getCategory: () => dispatch(actions.getCategory("ALL")),
        createCategory: (data) => dispatch(actions.createCategory(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateCatalog);
