import React, { Component } from "react";
import { connect } from "react-redux";
import "./Banner.scss"

import banner1 from "../../assets/Banner/banner1.jpeg"
import banner2 from "../../assets/Banner/banner2.jpeg"
import banner3 from "../../assets/Banner/banner3.jpeg"

class Banner extends Component {
    render() {

        return (
            <div className="banner_container">
                <img src={banner1} />
                <img src={banner2} />
                <img src={banner3} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
