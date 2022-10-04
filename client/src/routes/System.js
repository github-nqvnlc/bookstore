import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HeaderAdmin from '../containers/HeaderAdmin/HeaderAdmin';
import Admin from '../containers/System/Admin/Admin';
import Manager from '../containers/System/Manager/Manager';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <HeaderAdmin />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/admin" component={Admin} />
                            <Route path="/system/manager" component={Manager} />
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
