import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/footer";
import LayoutBook from "../../components/LayoutBook/LayoutBook";

class HomePage extends Component {
    render() {

        return (
            <React.Fragment>
                <Header />
                <Banner />
                <LayoutBook/>
                
                <Footer />
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
