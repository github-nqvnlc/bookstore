import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Author.scss";
import { Button, Table } from "reactstrap";
import CurrencyFormat from 'react-currency-format';
import ModalCreateAuthor from "./ModalCreateAuthor";
import ModalEditAuthor from "./ModalEditAuthor";
import AuthorDataGrid from "./AuthorDataGrid";

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenModalEdit: false,
            isOpen: false,
            author: [],
            authorEdit: {},
        };
    }
    componentDidMount() {
        this.props.getAuthor("ALL");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.author !== this.props.author) {
            this.setState({
                author: this.props.author
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

    handleCreateAuthor = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    handleEditAuthor = (author) => {
        this.setState({
            isOpenModalEdit: true,
            authorEdit: author
        })
    }
    handleDeleteAuthor = (author) => {
        this.props.deleteAuthor(author.id)
    }
    render() {
        let arrAuthor = this.state.author;
        return (
            <div>
                <div className="title">
                    Manage Author
                </div>
                <div className="section_body container">
                    <ModalCreateAuthor
                        isOpen={this.state.isOpenModal}
                        toggleModal={this.toggleModal}
                    />
                    <div className="content_header">
                        <button
                            onClick={() => this.handleCreateAuthor()}
                            className="button_create"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <i class="fas fa-plus"></i> Create new author
                        </button>
                    </div>
                    <AuthorDataGrid />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        author: state.manager.author,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthor: (id) => dispatch(actions.getAuthor(id)),
        deleteAuthor: (id) => dispatch(actions.deleteAuthor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Author);
