import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import logo from "../../assets/logo.png";
import "./footer.scss"
import fb from "../../assets/icon/facebook.png"
import ins from "../../assets/icon/insta.png"
import pin from "../../assets/icon/pinterest.png"
import tumb from "../../assets/icon/tumblr.png"
import tw from "../../assets/icon/twitter.png"
import yt from "../../assets/icon/youtube.png"
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

export default class Footer extends Component {
    render() {
        return (
            <Container maxWidth="xl">
                    <div className='footer_static'>
                        <Row>
                            <Col lg={4}>
                                <div className='left_container'>
                                    <div className='logo'>
                                        <img src={logo} />
                                    </div>
                                    <div className='address'>
                                        <p><b>Head office:</b> Bookstore Publication Corporation, K523/71, Cach Mang Thang Tam Street, Hoa Tho Dong Ward, Cam Le District, Da Nang City, Vietnam</p>
                                    </div>
                                    <div className='description_footer'>
                                        <p><b>Bookstore</b> accepts online orders and delivers to your door. DO NOT support ordering and receiving goods directly at the office as well as all Bookstore Systems worldwide.</p>
                                    </div>
                                    <div className='social_icon'>
                                        <a href="https://fb.com"> <img src={fb} /></a>
                                        <a href="https://instagram.com"> <img src={ins} /></a>
                                        <a href="https://twitter.com"> <img src={tw} /></a>
                                        <a href="https://youtube.com"> <img src={yt} /></a>
                                        <a href="https://pinterest.com"> <img src={pin} /></a>
                                        <a href="https://tumblr.com"> <img src={tumb} /></a>

                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className='right_container'>
                                    <Row>
                                        <Col md={4} ms={6} xs={12}>
                                            <div className='footer_title'>
                                                <h5>SERVICE</h5>
                                            </div>
                                            <div className='footer_content'>
                                                <ul>
                                                    <Link><li className='list_content'>Terms of Use</li></Link>
                                                    <Link><li className='list_content'>Privacy Policy</li></Link>
                                                    <Link><li className='list_content'>Payment Privacy Policy</li></Link>
                                                    <Link><li className='list_content'>About Bookstore</li></Link>
                                                    <Link><li className='list_content'>Central system - bookstore</li></Link>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md={4} ms={6} xs={12}>
                                            <div className='footer_title'>
                                                <h5>SUPPORT</h5>
                                            </div>
                                            <div className='footer_content'>
                                                <ul>
                                                    <Link><li className='list_content'>Exchange - return - refund policy</li></Link>
                                                    <Link><li className='list_content'>Warranty - chargeback policy</li></Link>
                                                    <Link><li className='list_content'>Shipping Policy</li></Link>
                                                    <Link><li className='list_content'>Wholesale Policy</li></Link>
                                                    <Link><li className='list_content'>Payment methods and output</li></Link>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md={4} ms={6} xs={12}>
                                            <div className='footer_title'>
                                                <h5>MY ACCOUNT</h5>
                                            </div>
                                            <div className='footer_content'>
                                                <ul>
                                                    <Link><li className='list_content'>Sign in/Create a new account</li></Link>
                                                    <Link><li className='list_content'>Change customer address</li></Link>
                                                    <Link><li className='list_content'>Account details</li></Link>
                                                    <Link><li className='list_content'>Wholesale Policy</li></Link>
                                                    <Link><li className='list_content'>Purchase history</li></Link>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Row>
                                            <div className='footer_title'>
                                                <h5>CONTACT</h5>
                                            </div>
                                            <Col pt={3} md={4}><Link><i class="fas fa-map-marker-alt"></i><div className='list_contact'>K523/71, Cach Mang Thang Tam Street, Hoa Tho Dong Ward, Cam Le District, Da Nang City, Vietnam</div></Link></Col>
                                            <Col pt={3} md={4}><Link><i class="fas fa-envelope"></i><div className='list_contact'>customer@bookstore.com</div></Link></Col>
                                            <Col pt={3} md={4}><Link><i class="fas fa-phone-volume"></i><div className='list_contact'>(+84) 582 070 987</div></Link></Col>
                                        </Row>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <div className='signature'>
                            <p>&copy; 2022 Bookstore.com, Develop by Van Loc</p>
                        </div>
                    </Row>
            </Container>
        )
    }
}
