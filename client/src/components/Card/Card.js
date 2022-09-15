import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from "reactstrap";
import "./Card.scss"

class CardItem extends Component {
    render() {

        return (
            <Card
                body
                style={{
                    width: "100%",
                    padding: 0,
                    margin: 0
                }}
                className="card"
                tag="div"
            >
                <img
                    alt="Sample"
                    src="https://nhasachphuongnam.com/images/thumbnails/213/213/detailed/234/harry-potter-va-dua-tre-bi-nguyen-rua-tb-2022.jpg"
                />
                <CardBody>
                    <div className="card_body">
                        <div className="card_content">
                            <CardTitle tag="h5">
                                {this.props.title}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted card_text" tag="div">
                                <p>{this.props.price} đ</p> <span>{this.props.price - (this.props.price * this.props.discount)} đ</span>
                            </CardSubtitle>
                            <CardText>
                                {/* kasjdlaskdjaslkasjdlaskdjaslkasjdlaskdjaslkasjdlaskdjaslkasjdlaskdjasl */}
                            </CardText>
                        </div>
                        <Button >
                            Buy
                        </Button>
                    </div>
                </CardBody>
            </Card>

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

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
