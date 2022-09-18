import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageAccount from '../containers/System/Admin/Account/ManageAccount';
import HeaderAdmin from '../containers/HeaderAdmin/HeaderAdmin';
import ManageBook from '../containers/System/Manager/Book/ManageBook';

class System extends Component {
    render() {
        const {     systemMenuPath } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <HeaderAdmin />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/admin/manage-account" component={ManageAccount} />
                            <Route path="/system/manager/manage-book" component={ManageBook} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
