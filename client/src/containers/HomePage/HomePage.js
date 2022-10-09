import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/footer";
import Section from "../../components/Section/Section";

class HomePage extends Component {
    render() {

        return (
            <React.Fragment>
                <Header />
                <Banner />

                <Section
                    name="Vietnamese Books"
                />
                <Section
                    name="English Books"
                />
                <Section
                    name="E-Books"
                />
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
