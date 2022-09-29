import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";


import "./Manager.scss";
import SideBar from "./SideBar/SideBar";
import SideContent from "./SideContent/SideContent";
import ManageBook from "./Book/ManageBook";
import Category from "./Category/Category";
import Author from "./Author/Author";
import TypeBook from "./TypeBook/TypeBook";
import Publisher from "./Publisher/Publisher";

class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenModalEdit: false,

            isOpen: false,
            previewImage: "",
        };
    }
    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) { }

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

    openPreviewImage = (image) => {
        this.setState({
            isOpen: true,
            previewImage: image,
        });
    };

    render() {
        let arrAccount = this.state.account;
        console.log(arrAccount);
        // let arrRole = this.state.role;

        return (

            <div>
                <div className="section">
                    <div className="body">
                        <div className="side_bar">
                            <SideBar />
                        </div>
                        <div className="side_content">
                            <Switch>
                                <Route path="/system/manager/dashboard" component={SideContent} />
                                <Route path="/system/manager/manage-customer" component={SideContent} />
                                <Route path="/system/manager/manage-book" component={ManageBook} />
                                <Route path="/system/manager/manage-author" component={Author} />
                                <Route path="/system/manager/manage-publisher" component={Publisher} />
                                <Route path="/system/manager/manage-category" component={Category} />
                                <Route path="/system/manager/manage-type-book" component={TypeBook} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        role: state.admin.role,
        account: state.admin.account,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getAllAccount: () => dispatch(actions.getAllAccount()),
        deleteAccount: (id) => dispatch(actions.deleteAccount(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
