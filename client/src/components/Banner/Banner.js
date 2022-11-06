import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./Banner.scss"

// import banner1 from "../../assets/Banner/banner1.jpeg"
// import banner2 from "../../assets/Banner/banner2.jpeg"
// import banner3 from "../../assets/Banner/banner3.jpeg"

import bn1 from "../../assets/bannerSale/bn_1.png"
import bn2 from "../../assets/bannerSale/bn_2.jpg"
import bn3 from "../../assets/bannerSale/bn_3.jpg"
import bn4 from "../../assets/bannerSale/bn_4.jpg"
import bn5 from "../../assets/bannerSale/bn_5.jpg"
import bn6 from "../../assets/bannerSale/bn_6.jpg"
import bn7 from "../../assets/bannerSale/bn_7.jpg"
import bn8 from "../../assets/bannerSale/bn_8.jpg"

import bnMini1 from "../../assets/bannerSale/bannerMini/bn1.jpg"
import bnMini2 from "../../assets/bannerSale/bannerMini/bn2.jpg"
import bnMini3 from "../../assets/bannerSale/bannerMini/bn3.jpg"
import bnMini4 from "../../assets/bannerSale/bannerMini/bn4.png"
import bnMini5 from "../../assets/bannerSale/bannerMini/bn5.jpg"
import bnMini6 from "../../assets/bannerSale/bannerMini/bn6.jpg"

import { Box, Container, Stack } from "@mui/system";

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
            <Container
                sx={{
                    mt: "1em",
                    mb: "1em",
                }}
                maxWidth="xl"
            >
                <Stack
                    sx={{
                        width: "100%",
                    }}
                    direction={{ md: "row", sm: "column" }}
                    justifyContent="space-between"
                    alignItems={{ md: "center" }}
                    spacing={2}>
                    <Box
                        sx={{
                            width: { md: "60%", sm: "100%" },
                            borderRadius: "50px",
                        }}>
                        <div className="banner_container ">
                            <div className="banner_content">
                                <Slider style={{ borderRadius: "5px" }} {...setting}>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn1} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn2} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn3} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn4} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn5} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn6} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn7} />
                                    </div>
                                    <div>
                                        <img style={{ borderRadius: "15px" }} src={bn8} />
                                    </div>

                                </Slider>
                            </div>
                        </div>
                        <Box
                            sx={{
                                width: { md: "100%", sm: "100%" },
                                height: "100%",
                                borderRadius: "50px",
                            }}
                        >
                            <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
                                <Box
                                    sx={{
                                        width: { md: "100%", sm: "50%" },
                                    }}
                                >
                                    <img style={{ borderRadius: "15px", width: "100%" }} src={bnMini1} />
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: "100%", sm: "50%" },
                                    }}
                                >
                                    <img style={{ borderRadius: "15px", width: "100%" }} src={bnMini2} />
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: "100%", sm: "50%" },
                                    }}
                                >
                                    <img style={{ borderRadius: "15px", width: "100%" }} src={bnMini3} />
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: "100%", sm: "50%" },
                                    }}
                                >
                                    <img style={{ borderRadius: "15px", width: "100%" }} src={bnMini4} />
                                </Box>

                            </Stack>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: "1em",
                            width: { md: "40%", sm: "100%" },
                            height: "100%",
                            borderRadius: "50px",
                        }}
                    >
                        <Stack sx={{ width: "100%", height: "100%" }} justifyContent="space-between" direction={{ md: "column", sm: "row", xs: "row" }} spacing={2}>
                            <Box
                                sx={{
                                    width: { md: "100%", sm: "50%" },
                                }}
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        borderRadius: "15px",
                                    }}
                                    src={bnMini5} />
                            </Box>
                            <Box
                                sx={{
                                    width: { md: "100%", sm: "50%" },
                                }}
                            >
                                <img style={{ width: "100%", borderRadius: "15px", }} src={bnMini6} />
                            </Box>

                        </Stack>
                    </Box>
                </Stack>


            </Container>


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
