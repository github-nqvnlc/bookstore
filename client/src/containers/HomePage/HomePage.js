import React, { Component } from "react";
import { connect } from "react-redux";

import Banner from "../../components/Banner/Banner";

import Header from "../../components/Header/Header";

class HomePage extends Component {
    render() {

        return (
            <React.Fragment>
                <Header />
                <Banner />
                <Banner />
                <Banner />
            </React.Fragment>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
