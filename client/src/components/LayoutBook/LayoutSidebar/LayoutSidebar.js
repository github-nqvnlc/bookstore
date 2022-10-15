import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { UncontrolledCollapse } from 'reactstrap';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Typography } from '@mui/material';

const LayoutSidebar = (props) => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        props.getCategory();
        props.getCatalog();
    }, [])
    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <React.Fragment>

            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Typography variant="h5" gutterBottom>
                            Category
                        </Typography>
                    </ListSubheader>
                }
            >
                {props.category?.map((itemCategory, indexCategory) => {
                    let toggler = "toggler" + indexCategory;
                    console.log(toggler)
                    return (
                        <div>
                            <ListItemButton id={toggler} onClick={handleClick}>
                                <ListItemText primary={itemCategory.name} />
                                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                            </ListItemButton>
                            {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
                            <UncontrolledCollapse toggler={toggler}>
                                {props.catalog?.map((itemCatalog, indexCatalog) => {
                                    let switchToggler = "toggler2" + indexCatalog
                                    if (itemCatalog.categoryId === itemCategory.id) {
                                        return (
                                            <List component="div" disablePadding>
                                                <ListItemButton id={switchToggler} sx={{ pl: 4 }}>
                                                    <CircleOutlinedIcon sx={{ fontSize: 7, marginRight: "0.7em" }} />
                                                    <ListItemText primary={itemCatalog.name} />
                                                </ListItemButton>
                                                <UncontrolledCollapse toggler={switchToggler}>
                                                    {props.type?.map((itemType, indexType) => {
                                                        if (itemType.catalogId === itemCatalog.id) {
                                                            return (
                                                                <List component="div" disablePadding>
                                                                    <ListItemButton sx={{ pl: 6 }}>
                                                                        <FiberManualRecordSharpIcon sx={{ fontSize: 7, marginRight: "0.7em" }} />
                                                                        <ListItemText primary={itemType.name} />
                                                                    </ListItemButton>
                                                                </List>
                                                            )
                                                        }
                                                    }).reverse()}
                                                </UncontrolledCollapse>
                                            </List>
                                        )
                                    }
                                })}
                            </UncontrolledCollapse>
                            {/* </Collapse> */}
                        </div>
                    );
                }).reverse()}
            </List>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        catalog: state.manager.catalog,
        category: state.manager.category,
        type: state.manager.type,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => dispatch(actions.getCategory("ALL")),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSidebar);
