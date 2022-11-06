import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/footer";
import LayoutBook from "../../components/LayoutBook/LayoutBook";
import { Route, Switch } from "react-router";
import { path } from "../../utils/constant";
import BookDetail from "../../components/BookDetail/BookDetail";
import { Box } from "@mui/material";

class HomePage extends Component {
    render() {

        return (
            <React.Fragment>
                <Header />
                <Box sx={{mt: {sm: "10em", xs: "7em"}}}>
                    <Switch>
                        <Route exact path={"/"} >
                            <Banner />
                            <LayoutBook />
                        </Route>
                        <Route path={path.BOOK_DETAIL}>
                            <BookDetail />
                        </Route>
                    </Switch>
                </Box>
                
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
