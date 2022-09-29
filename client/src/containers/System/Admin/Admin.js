import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils/constant"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import ManageAccount from './Account/ManageAccount'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        return (
            <div><ManageAccount /></div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);