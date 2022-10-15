import React, { Component } from "react";
  
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./TypeBook.scss";
import { Button, Table } from "reactstrap";
import CurrencyFormat from 'react-currency-format';
import ModalCreateTypeBook from "./ModalCreateTypeBook";
import ModalEditTypeBook from "./ModalEditTypeBook";
import TypeDataGrid from "./TypeDataGrid";

class TypeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenModalEdit: false,
            isOpen: false,
            typeBook: [],
            typeBookEdit: {},
        };
    }
    componentDidMount() {
        this.props.getTypeBook("ALL");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.typeBook !== this.props.typeBook) {
            this.setState({
                typeBook: this.props.typeBook
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

    handleCreateTypeBook = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    handleEditTypeBook = (typeBook) => {
        this.setState({
            isOpenModalEdit: true,
            typeBookEdit: typeBook
        })
    }

    handleDeleteTypeBook = (typeBook) => {
        this.props.deleteTypeBook(typeBook.id)
    }
    render() {
        let arrTypeBook = this.state.typeBook;
        return (
            <div>
                <div className="title">
                    Manage Type Book
                </div>
                <div className="section_body container">
                    <ModalCreateTypeBook
                        isOpen={this.state.isOpenModal}
                        toggleModal={this.toggleModal}
                    />
                    <ModalEditTypeBook
                        isOpen={this.state.isOpenModalEdit}
                        toggleModal={this.toggleModalEdit}
                        typeBookEdit={this.state.typeBookEdit}
                    />
                    <div className="content_header">
                        <button
                            onClick={() => this.handleCreateTypeBook()}
                            className="button_create"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <i class="fas fa-plus"></i> Create new type book
                        </button>
                    </div>
                    <div className="content_body">
                        <TypeDataGrid />
                        
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
         
        typeBook: state.manager.type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTypeBook: (id) => dispatch(actions.getType(id)),
        deleteTypeBook: (id) => dispatch(actions.deleteType(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeBook);
