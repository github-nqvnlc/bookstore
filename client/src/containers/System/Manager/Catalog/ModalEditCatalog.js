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

class ModalEditCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            //catalog
            id: "",
            name: "",
            description: "",
            category: "",

            categoryCatalogData: {},

            //get by name
            categoryByName: {},

            //get all arr
            arrCategory: [],
        };
    }
    componentDidMount() {
        this.props.getCategory();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

        if (prevProps.catalogEdit !== this.props.catalogEdit) {
            let catalog = this.props.catalogEdit
            this.setState({
                id: catalog.id,
                name: catalog.name,
                description: catalog.description,
                category: catalog.categoryId,
                categoryCatalogData: catalog.categoryCatalogData,
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
            "category"
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

    handleEditCatalog = () => {
        let isValid = this.checkValidInput()
        if (isValid === false) return;
        this.toggle()

        this.props.editCatalog({
            id: this.state.id,
            name: this.state.name,
            categoryId: this.state.category,
            description: this.state.description
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

        console.log(this.state.categoryCatalogData)
        let arrCategory = this.state.arrCategory
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered

                >
                    <ModalHeader toggle={() => this.toggle()}>Edit Catalog</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{ width: "100%", }}>
                            <Label>Name Catalog</Label>
                            <Input
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "name")
                                }
                                value={name}
                                className="input_focus_book input_hover_book"
                            />
                            <Label>Category</Label>
                            <CreatableSelect
                                isClearable
                                defaultValue={{
                                    value: this.state.category,
                                    label: this.state.categoryCatalogData.name,
                                }}
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
                        <Button className="btn_create" onClick={() => this.handleEditCatalog()}>
                            Edit Catalog
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
         
        catalog: state.manager.catalog,
        category: state.manager.category,

        categoryByName: state.manager.categoryByName,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editCatalog: (data) => dispatch(actions.editCatalog(data)),
        getCatalog: (id) => dispatch(actions.getCatalog(id)),
        getCategory: () => dispatch(actions.getCategory("ALL")),
        createCategory: (data) => dispatch(actions.createCategory(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCatalog);
