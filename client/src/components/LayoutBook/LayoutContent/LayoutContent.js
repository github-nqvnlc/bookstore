import React, { Component } from 'react'
import ImgMediaCard from '../../Card/Card'
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';

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
            let book = []
            this.props.book.map((item, index) => {
                if (this.props.categoryId || this.props.catalogId || this.props.typeId) {
                    if (this.props.categoryId === "all") {
                        book = this.props.book
                    } else if (item.categoryId === this.props.categoryId) {
                        book.push(item)
                    } 
                    if (this.props.catalogId === "all") {
                        book = this.props.book
                    } else if (item.catalogId === this.props.catalogId) {
                        book.push(item)
                    }
                    if (this.props.typeId === "all") {
                        book = this.props.book
                    } else if (item.typeId === this.props.typeId) {
                        book.push(item)
                    }
                } else {
                    book = this.props.book
                }
               
            })
            this.setState({
                book: book,
            })
        }


    }

    render() {
        let book = this.state.book
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    pl: "2em",
                    pr: "2em",
                    bgcolor: "#fff",
                    borderRadius: "10px",
                    mb: "1em",
                }}
            >
                <Typography
                    sx={{ padding: "1em", }} variant="h6" gutterBottom>
                    {this.props.nameContent}
                </Typography>
                <Stack sx={{
                    width: "100%",
                    height: "100%"
                }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid sx={{ width: "auto" }} container spacing={2}>
                        {book?.map((item, index) => {
                            return (
                                <Grid >
                                    <ImgMediaCard addToCart={() => { this.props.AddCart(item) }} loading={this.state.loading} book={item} key={index} />
                                </Grid>
                            )
                        })}
                    </Grid>

                </Stack>
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
        getCategory: (id) => dispatch(actions.getCategory(id)),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),

        AddCart: (book) => dispatch(actions.AddCart(book)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContent);


