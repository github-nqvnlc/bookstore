import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarContainer
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { Button, ButtonGroup, Stack } from '@mui/material';
import ModalEditCategory from './ModalEditCategory';

function CustomToolbar() {
    return (
        <GridToolbarContainer >
            <GridToolbarColumnsButton color='success' />
            <GridToolbarFilterButton color='success' />
            <GridToolbarDensitySelector color='success' />
            <GridToolbarExport color='success' />
        </GridToolbarContainer>
    );
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="success"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const CategoryDataGrid = (props) => {
    const [category, setCategory] = React.useState([])
    const [categoryEdit, setCategoryEdit] = React.useState({})
    const [open, setOpen] = React.useState(false) 
 const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setCategory(props.category)
    })

    const toggleModalEdit = () => {
        setOpen(!open)
    }
    
    const columns = [
        { field: 'stt', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Category Name',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description about Category',
            width: 250,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 200,
            editable: false,
            softable: false,
            renderCell: (params) => {
                const onClickDelete = (e) => {
                    const id = params.row.id;
                    props.deleteCategory(id)
                };
                const onClickEdit = (e) => {
                    const category = params.row.category;
                    setOpen(!open)
                    setCategoryEdit(category);
                    console.log(category)
                }
                return (
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-around" spacing={2}>
                        <Button variant="outlined" color="success" size="small" onClick={onClickEdit}>Edit</Button>
                        <Button variant="outlined" color="error" size="small" onClick={onClickDelete}>Delete</Button>
                    </Stack>
                );
            },
        },
    ];



    const rows = [];
    category?.map((itemCategory, indexCategory) => {
        rows.push({ stt: indexCategory + 1, name: itemCategory.name, description: itemCategory.description, id: itemCategory.id, category: itemCategory });
    })

    return (
        <Box sx={{ height: "80vh", width: '100%' }}>
            <ModalEditCategory
                isOpen={open}
                toggleModal={() => {
                    setOpen(!open)
                }}
                categoryEdit={categoryEdit}
            />
            <DataGrid
                sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[4]}
                checkboxSelection={false}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    Toolbar: CustomToolbar,
                    Pagination: CustomPagination,
                    LoadingOverlay: LinearProgress,
                }}
                loading={loading}
            />
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        category: state.manager.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (id) => dispatch(actions.getCategory(id)),
        deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDataGrid);