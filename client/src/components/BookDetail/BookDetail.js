import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Box, Breadcrumbs, Button, Chip, Divider, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { Component } from 'react'
import { Redirect, withRouter } from "react-router";
import Lightbox from "react-image-lightbox";
import { NumericFormat } from "react-number-format";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Order from "../Cart/Order";

class BookDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            author: {},
            publisher: {},
            category: {},
            catalog: {},
            type: {},
            bookEdit: {},
            //format number
            formatPrice: "",
            formatDiscount: "",
            //get by name props


            //handle image
            isOpen: false,
            isOpenPreview: false,
            previewImage: "",
            previewUrlImage: "",

            love: false,

            open: false,
        }
    }

    componentDidMount() {
        this.props.getBook(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let image64 = "";

        if (prevProps.book !== this.props.book) {

            if (this.props.book !== null && this.props.book.image) {
                image64 = new Buffer(this.props.book.image, "base64").toString("binary");
                this.setState({
                    book: this.props.book,
                    author: this.props.book.authorData,
                    publisher: this.props.book.publisherData,
                    category: this.props.book.categoryData,
                    catalog: this.props.book.catalogData,
                    type: this.props.book.typeData,
                    previewUrlImage: image64,
                })
            } else {
                this.props.history.push("/")
            }


        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    openPreviewImage = (image) => {
        this.setState({
            isOpenPreview: true,
            previewImage: image,
        }, () => { console.log(this.state.isOpenPreview) });
    };
    handleLikeBook = () => {
        this.setState({
            love: !this.state.love
        })
    }
    render() {
        let descriptionHTML = new MarkdownIt().render(`${this.state.book.description}`)
        return (
            <Container maxWidth="xl">
                <Box
                    sx={{
                        mt: "5em",
                        width: "100%",
                        mb: "1em",
                    }}
                >
                    <Breadcrumbs
                        sx={{
                            p: "1em",
                            pl: "0",
                        }}

                    >
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            underline="hover"
                            color="inherit"
                            onClick={() => { this.props.history.push("/") }}>
                            Home Page
                        </Link>
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            underline="hover"
                            color="inherit"
                            onClick={() => { this.props.history.push(`/category/${this.state.category.name}/${this.state.category.id}`) }}
                        >
                            {this.state.category.name}
                        </Link>
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            underline="hover"
                            color="inherit"
                            onClick={() => { this.props.history.push(`/catalog/${this.state.catalog.name}/${this.state.catalog.id}`) }}
                        >
                            {this.state.catalog.name}
                        </Link>
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            underline="hover"
                            color="inherit"
                            onClick={() => { this.props.history.push(`/type/${this.state.type.name}/${this.state.type.id}`) }}
                        >
                            {this.state.type.name}
                        </Link>
                        <Typography color="text.primary">
                            {this.state.book.name}
                        </Typography>
                    </Breadcrumbs>

                    <Stack
                        direction={{ sm: "row", xs: "column" }}
                        sx={{
                            width: "100%",
                            bgcolor: "#fff",
                            borderRadius: "10px",
                            padding: "2em",
                        }}
                        spacing={2}
                    >
                        <Box
                            sx={{ width: { md: 400, sm: 250, xs: "100%" }, }}
                        >
                            <Box
                                sx={{
                                    width: { md: 400, sm: 250, xs: "100%" },
                                    height: { md: 400, sm: 250, xs: "100%" },
                                }}>
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        cursor: "pointer",
                                    }}
                                    src={this.state.previewUrlImage}
                                    onClick={() => this.openPreviewImage(this.state.previewUrlImage)}
                                />
                            </Box>
                            <Stack
                                direction="row" spacing={2}
                                justifyContent="space-between"
                                sx={{ mt: 2, width: "100%" }}>
                                <Tooltip title="Add to your cart">
                                    <Button onClick={() => { this.props.AddCart(this.state.book) }} sx={{ width: "50%", height: "3em" }} color="success" variant="outlined">Add to cart</Button>
                                </Tooltip>
                                <Tooltip title="Buy now">
                                    <Button onClick={this.handleClickOpen} sx={{ width: "50%", height: "3em" }} color="success" variant="contained">Buy now</Button>
                                </Tooltip>
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { md: "24px", xs: "16px" },
                                    pt: "1em",
                                    pb: "1em",
                                    pl: { md: "1em", xs: 0 },
                                    pr: { md: "1em", xs: 0 },
                                }}
                                variant="h6" >
                                {this.state.book.name}
                            </Typography>
                            <Divider />
                            <Box

                                sx={{
                                    ml: { md: "1em", xs: 0 },
                                    mb: "1em"
                                }}
                            >
                                <Stack sx={{ mt: "1em" }} spacing={2} direction={{ md: "row", sm: "column" }}>
                                    <Stack direction="row" >
                                        <Typography sx={{
                                            pl: { md: "1em", xs: 0 },
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }} variant="body2" gutterBottom>Author:</Typography>
                                        <Typography sx={{
                                            pl: "1em",
                                            fontSize: "14px",
                                            fontWeight: 300
                                        }} variant="body2" gutterBottom>{this.state.author.name}</Typography>
                                    </Stack>
                                    <Stack direction="row" >
                                        <Typography sx={{
                                            pl: { md: "1em", xs: 0 },
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }} variant="body2" gutterBottom>Publisher:</Typography>
                                        <Typography sx={{
                                            pl: "1em",
                                            fontSize: "14px",
                                            fontWeight: 300
                                        }} variant="body2" gutterBottom>{this.state.publisher.name}</Typography>
                                    </Stack>
                                </Stack>
                                <Divider Sx={{ mt: "1em" }} />
                                <Stack sx={{ mt: "1em" }} spacing={2} direction={{ lg: "row", md: "column" }}>
                                    <Stack direction="row" >
                                        <Typography sx={{
                                            pl: { md: "1em", xs: 0 },
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }} variant="body2" gutterBottom>Category:</Typography>
                                        <Typography sx={{
                                            pl: "1em",
                                            fontSize: "14px",
                                            fontWeight: 300
                                        }} variant="body2" gutterBottom>{this.state.category.name}</Typography>
                                    </Stack>
                                    <Stack direction="row" >
                                        <Typography sx={{
                                            pl: { md: "1em", xs: 0 },
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }} variant="body2" gutterBottom>Catalog:</Typography>
                                        <Typography sx={{
                                            pl: "1em",
                                            fontSize: "14px",
                                            fontWeight: 300
                                        }} variant="body2" gutterBottom>{this.state.catalog.name}</Typography>
                                    </Stack>
                                    <Stack direction="row" >
                                        <Typography sx={{
                                            pl: { md: "1em", xs: 0 },
                                            fontSize: "14px",
                                            fontWeight: 500
                                        }} variant="body2" gutterBottom>Type Book:</Typography>
                                        <Typography sx={{
                                            pl: "1em",
                                            fontSize: "14px",
                                            fontWeight: 300
                                        }} variant="body2" gutterBottom>{this.state.type.name}</Typography>
                                    </Stack>
                                </Stack>
                            </Box>

                            <Box
                                sx={{
                                    p: { md: "1em", xs: 0 },
                                    mb: "1em"
                                }}
                            >
                                <Stack spacing={2} direction={"row"} alignItems="center">
                                    <NumericFormat
                                        value={Math.floor(this.state.book.price - (this.state.book.price * this.state.book.discount))}
                                        thousandsGroupStyle="thousands"
                                        thousandSeparator=","
                                        suffix={" VND"}
                                        displayType="text"
                                        renderText={(value) => (
                                            <Typography
                                                color="error"
                                                sx={{
                                                    pl: { md: "1em", xs: 0 },
                                                    fontSize: { lg: "32px", md: "24px", sm: "20px", xs: "18px" },
                                                    fontWeight: 700
                                                }}
                                            >
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                    <NumericFormat
                                        value={this.state.book.price}
                                        thousandsGroupStyle="thousands"
                                        thousandSeparator=","
                                        suffix={" VND"}
                                        displayType="text"
                                        renderText={(value) => (
                                            <Typography
                                                gutterBottom
                                                sx={this.state.book.discount === 0 ?
                                                    { display: "none" } :
                                                    {
                                                        display: "block",
                                                        textDecorationLine: "line-through"
                                                    }
                                                }
                                            >
                                                {value}
                                            </Typography>)}
                                    />
                                    <NumericFormat
                                        value={Math.floor(this.state.book.discount * 100)}
                                        thousandsGroupStyle="thousands"
                                        thousandSeparator=","
                                        suffix={" %"}
                                        displayType="text"
                                        renderText={(value) => (
                                            <Chip sx={{ fontSize: "16px" }} label={value} variant="outlined" color="error" />
                                        )}
                                    />
                                </Stack>
                            </Box>
                            <Box
                                sx={{
                                    pl: { md: "1em", xs: 0 },
                                    mb: "1em"
                                }}
                            >
                                {this.state.love === false ? (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Tooltip title="Add to favorite book">
                                            <IconButton
                                                sx={{ margin: 0, }}
                                                color="error"
                                                variant="outlined"
                                                aria-label="Add to favorite book"
                                                onClick={this.handleLikeBook}
                                            >
                                                <FavoriteBorderIcon />

                                            </IconButton>
                                        </Tooltip>
                                        <Typography>Add to favorite book</Typography>
                                    </Stack>

                                ) : (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Tooltip title="Remove to favorite book">
                                            <IconButton
                                                sx={{ margin: 0, }}
                                                color="error"
                                                variant="outlined"
                                                aria-label="Remove to favorite book"
                                                onClick={this.handleLikeBook}
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Typography>Favorite book</Typography>
                                    </Stack>
                                )}
                            </Box>


                        </Box>
                    </Stack>

                </Box>
                <Box
                    sx={{
                        p: { md: "2em", xs: "1em" },
                        mb: "1em",
                        bgcolor: "#fff",
                        borderRadius: "10px",
                    }}
                >
                    <Typography sx={{
                        mb: "1em",
                        fontSize: "14px",
                        fontWeight: 500
                    }} variant="body2" gutterBottom>Description:</Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 300,
                            textAlign: "justify"
                        }} variant="body2" gutterBottom
                        dangerouslySetInnerHTML={{ __html: descriptionHTML }}></Typography>
                </Box>
                {this.state.isOpenPreview === true && (
                    <Lightbox
                        mainSrc={this.state.previewUrlImage}
                        onCloseRequest={() => {
                            this.setState({ isOpenPreview: false });
                        }}
                        className="preview_lightbox"
                    />
                )}
                <Order
                    // cart={props.book}
                    open={this.state.open}
                    onClose={this.handleClose}
                    total={Math.round(
                        (this.state.book.price - this.state.book.price * this.state.book.discount) / 1000
                    ) * 1000}
                    book={this.state.book}
                />
            </Container>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        book: state.manager.book,
        category: state.manager.category,
        catalog: state.manager.catalog,
        type: state.manager.type,


        loading: state.manager.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBook: (id) => dispatch(actions.getBook(id)),
        getCategory: () => dispatch(actions.getCategory("ALL")),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),

        AddCart: (book) => dispatch(actions.AddCart(book)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetail))