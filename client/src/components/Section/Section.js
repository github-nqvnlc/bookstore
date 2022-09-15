import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Card from "../Card/Card";
import "./Section.scss"

class Section extends Component {
    render() {
        let setting = {
            dots: false,
            infinite: true,
            prevArrow: <button ><i class="fa fa-chevron-left"></i></button>,
            nextArrow: <button ><i class="fa fa-chevron-right"></i></button>,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 3000
        }
        return (
            <div className="section_container container ">
                <div className="section_content">
                    <h1 className="section_title">{this.props.name}</h1>
                    <Slider className="section_slider" {...setting}>
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                        <Card
                            title="HaryPotter"
                            price={210000}
                            discount={0.25}
                        />
                    </Slider>
                    <div className="section_mobile">
                        <div className="section_mobile_item">
                            <Card
                                title="HaryPotter"
                                price={210000}
                                discount={0.25}
                            />
                        </div>
                        <div className="section_mobile_item">
                            <Card
                                title="HaryPotter"
                                price={210000}
                                discount={0.25}
                            />
                        </div>
                        <div className="section_mobile_item">
                            <Card
                                title="HaryPotter"
                                price={210000}
                                discount={0.25}
                            />
                        </div>
                        <div className="section_mobile_item">
                            <Card
                                title="HaryPotter"
                                price={210000}
                                discount={0.25}
                            />
                        </div>
                        <div className="section_mobile_item">
                            <Card
                                title="HaryPotter"
                                price={210000}
                                discount={0.25}
                            />
                        </div>
                        
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
