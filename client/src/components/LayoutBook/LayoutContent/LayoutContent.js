import React, { Component } from 'react'
import ImgMediaCard from '../../Card/Card'
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Grid } from '@mui/material';

class LayoutContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book: [],

            loading: false,
        }
    }

    componentDidMount() {
        this.props.getBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.book !== this.props.book) {
            this.setState({
                book: this.props.book,
            })
        }

        if (prevState.loading !== this.props.loading) {
            this.setState({
                loading: this.props.loading,
            })
        }
    }

    render() {
        let book = this.state.book
        return (
            <Box>
                <Grid container spacing={2}>
                    {book?.map((item, index) => {
                        return (
                            <Grid >
                                <ImgMediaCard addToCart={() => { this.props.AddCart(item) }} loading={this.state.loading} book={item} key={index} />
                            </Grid>
                        )
                    })}
                </Grid>

            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.manager.book,
        category: state.manager.category,
        catalog: state.manager.catalog,
        type: state.manager.type,
        categoryByName: state.manager.categoryByName,
        catalogByName: state.manager.catalogByName,
        typeByName: state.manager.typeByName,

        loading: state.manager.loading,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBook: () => dispatch(actions.getBook("ALL")),
        getCategory: () => dispatch(actions.getCategory("ALL")),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),

        AddCart: (book) => dispatch(actions.AddCart(book)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContent);


