import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Publisher.scss";
import SideContent from "../SideContent/SideContent";
import SideBar from "../SideBar/SideBar";
import { Button, Table } from "reactstrap";
import CurrencyFormat from 'react-currency-format';
import ModalCreatePublisher from "./ModalCreatePublisher";
import ModalEditPublisher from "./ModalEditPublisher";

class Publisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenModalEdit: false,
            isOpen: false,
            publisher: [],
            publisherEdit: {},
        };
    }
    componentDidMount() {
        this.props.getPublisher("ALL");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.publisher !== this.props.publisher) {
            this.setState({
                publisher: this.props.publisher
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

    handleCreatePublisher = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    handleEditPublisher = (publisher) => {
        this.setState({
            isOpenModalEdit: true,
            publisherEdit: publisher
        })
    }
    handleDeletePublisher = (publisher) => {
        this.props.deletePublisher(publisher.id)
    }
    render() {
        let arrPublisher = this.state.publisher;
        return (
            <div>
                <div className="title">
                    Manage Publisher
                </div>
                <div className="section_body container">
                    <ModalCreatePublisher
                        isOpen={this.state.isOpenModal}
                        toggleModal={this.toggleModal}
                    />
                    <ModalEditPublisher
                        isOpen={this.state.isOpenModalEdit}
                        toggleModal={this.toggleModalEdit}
                        publisherEdit={this.state.publisherEdit}
                    />
                    <div className="content_header">
                        <button
                            onClick={() => this.handleCreatePublisher()}
                            className="button_create"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <i class="fas fa-plus"></i> Create new publisher
                        </button>
                    </div>
                    <div className="content_body">
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Publisher Name
                                    </th>
                                    <th>
                                        Publisher Description
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrPublisher && arrPublisher.length > 0 &&
                                    arrPublisher.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    {index + 1}
                                                </th>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.description}
                                                </td>
                                                <td>
                                                    <button onClick={() => this.handleEditPublisher(item)} className="buttonEdit" >Edit</button>
                                                    <button onClick={() => this.handleDeletePublisher(item)} className="buttonDelete">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        publisher: state.manager.publisher,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublisher: (id) => dispatch(actions.getPublisher(id)),
        deletePublisher: (id) => dispatch(actions.deletePublisher(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publisher);
