import React, { Component } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Backdrop, Drawer, Link, List, ListItem, ListItemButton, ListItemText, MenuList, Paper, Stack } from "@mui/material";
import { Container } from "reactstrap";
import LayoutSidebar from "../LayoutBook/LayoutSidebar/LayoutSidebar";


const ToggleMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hover, setHover] = React.useState(0)

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setHover(0);
    };


    const [category, setCategory] = React.useState([])
    const [catalog, setCatalog] = React.useState([])
    const [type, setType] = React.useState([])

    React.useEffect(() => {
        props.getCategory()
        props.getCatalog()
        props.getType()

    }, [])

    if (props.category && category !== props.category) {
        setCategory(props.category)
    }

    if (props.catalog && catalog !== props.catalog) {
        setCatalog(props.catalog)
    }

    if (props.type && type !== props.type) {
        setType(props.type)
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Menu">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Backdrop open={open} />
            <Menu
                sx={{ display: { md: "block", xs: "none" } }}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <Box sx={{ borderRadius: "10px", minWidth: "400px" }}>
                    <Stack direction="row">
                        <Box sx={{
                            minWidth: "200px",
                        }}>
                            <Typography
                                sx={{ padding: "1em", }} variant="h6" gutterBottom>
                                All Category
                            </Typography>
                            {category?.map((itemCategory, indexCategory) => {

                                return (
                                    <MenuItem
                                        key={indexCategory}
                                        color="success"
                                        sx={{ padding: "0", }}>
                                        <ListItem
                                            key={indexCategory}
                                            id={"id" + indexCategory}
                                            onClick={() => {
                                                setHover(indexCategory + 1);
                                            }}
                                        >
                                            <ListItemText primary={itemCategory.name} />
                                        </ListItem>
                                    </MenuItem>
                                )
                            }).reverse()}
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        {category?.map((itemCategory, indexCategory) => {
                            hover === 0 && setHover(indexCategory + 1)
                            return (
                                <Box sx={{ minWidth: "200px", }} hidden={hover && hover === indexCategory + 1 ? false : true} >
                                    <Typography
                                        sx={{
                                            padding: "1em",
                                            minWidth: "100px",
                                        }} variant="h6" gutterBottom>
                                        {itemCategory.name}
                                        <Link href="#" underline="hover">
                                            <Typography sx={{
                                                pl: "1em",
                                                cursor: "pointer",
                                            }} variant="caption" gutterBottom>View all{" >>"}</Typography>
                                        </Link>
                                    </Typography>

                                    <Grid xs={12} container spacing={0}>
                                        {catalog?.map((itemCatalog, indexCatalog) => {
                                            if (itemCatalog.categoryId === itemCategory.id) {
                                                let typeCatalog = []
                                                return (
                                                    <Grid sx={{ width: "100%" }} lg={3} md={4} sm={6} xs={12}>
                                                        <ListItem>
                                                            <Box
                                                                sx={{ width: "100%" }}
                                                            >
                                                                <Typography
                                                                    variant="subtitle2" gutterBottom>
                                                                    {itemCatalog.name}
                                                                </Typography>

                                                                {
                                                                    type?.map((itemType, indexType) => {
                                                                        if (itemType.catalogId === itemCatalog.id) {
                                                                            typeCatalog.push(itemType);

                                                                        }
                                                                    })
                                                                }
                                                                {
                                                                    typeCatalog.slice(0, 5).map((itemType, indexType) => {
                                                                        return (
                                                                            <ListItem sx={{
                                                                                pt: 0.2,
                                                                                pb: 0.2,
                                                                                cursor: "pointer",
                                                                                "&:hover": {
                                                                                    color: "green",
                                                                                }
                                                                            }}>
                                                                                <Typography key={indexType} variant="caption" gutterBottom> {itemType.name}</Typography>
                                                                            </ListItem>
                                                                        )
                                                                    }).reverse()
                                                                }
                                                                <Link href="#" underline="hover">
                                                                    <ListItem sx={{
                                                                        pt: 0.2,
                                                                        pb: 0.2,
                                                                        cursor: "pointer",

                                                                    }}>
                                                                        <Typography variant="caption" gutterBottom>View more{" >>"}</Typography>
                                                                    </ListItem>
                                                                </Link>
                                                            </Box>
                                                        </ListItem>
                                                    </Grid>
                                                )
                                            }
                                        })}
                                    </Grid>
                                </Box>
                            )
                        }).reverse()}

                    </Stack>
                </Box>

            </Menu>
            <Drawer
                open={open}
                onClose={handleClose}
                sx={{
                    display: { md: "none", xs: "block" },
                    width: "90vw",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "100vw",
                        boxSizing: 'border-box',
                    },
                }}>
                <Box sx={{ width: "100%", p: "1em", display: "flex", justifyContent: 'flex-end' }}>

                    <IconButton
                        onClick={handleClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider />
                <LayoutSidebar sx={{ width: "100%" }} />
            </Drawer>
        </React.Fragment >
    );


}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        image: state.user.image,
        userInfo: state.user.userInfo,

        category: state.manager.category,
        catalog: state.manager.catalog,
        type: state.manager.type,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getUserImage: (id) => dispatch(actions.getUserImage(id)),


        getCategory: () => dispatch(actions.getCategory("ALL")),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleMenu);
