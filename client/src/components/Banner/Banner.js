import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./Banner.scss"



import banner1 from "../../assets/Banner/banner1.jpeg"
import banner2 from "../../assets/Banner/banner2.jpeg"
import banner3 from "../../assets/Banner/banner3.jpeg"

class Banner extends Component {
    render() {
        let setting = {
            dots: false,
            infinite: true,
            // arrows: false,
            prevArrow: <button ><i class="fa fa-chevron-left"></i></button>,
            nextArrow: <button ><i class="fa fa-chevron-right"></i></button>,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
        }
        return (
            <div className="banner_container container ">
                <div className="banner_content">
                    <Slider {...setting}>
                        <div className="banner_item">
                            <img src={banner1} />
                        </div>
                        <div>
                            <img src={banner2} />
                        </div>
                        <div>
                            <img src={banner3} />
                        </div>
                        
                    </Slider>
                </div>
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
