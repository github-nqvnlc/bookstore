import React, { Component } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Redirect, useHistory } from "react-router";

const AccountMenu = (props) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        console.log("check props: ", props.userInfo)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.processLogout();
    }

    if (props.userInfo && props.userInfo !== null) {
        props.getUserImage(props.userInfo.userId)
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={props.image && props.image !== null ? props.image : null} sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar src={props.image && props.image !== null ? props.image : null} /> {props.userInfo.lastName}, Profile
                </MenuItem>

                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <ShoppingBag fontSize="small" />
                    </ListItemIcon>
                    Your shopping cart
                </MenuItem>
                <MenuItem onClick={() => (history.push("/system/manager/manage-book"))}>
                    <ListItemIcon>
                        <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    Go to Manager
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );


}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        image: state.user.image,
        userInfo: state.user.userInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getUserImage: (id) => dispatch(actions.getUserImage(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
