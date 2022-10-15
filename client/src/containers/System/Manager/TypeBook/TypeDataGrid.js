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
import ModalEditTypeBook from './ModalEditTypeBook';

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

const TypeDataGrid = (props) => {
    const [type, setType] = React.useState([])
    const [typeEdit, setTypeEdit] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        setType(props.type)
    })

    const toggleModalEdit = () => {
        setOpen(!open)
    }
    
    const columns = [
        { field: 'stt', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Type Name',
            width: 250,
            editable: false,
        },
        {
            field: 'catalog',
            headerName: 'Catalog',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description about Type',
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
                    setLoading(true)
                    const id = params.row.id;
                    setTimeout(() => {
                        props.deleteType(id)
                        setLoading(false)
                    }, 3000)
                };
                const onClickEdit = (e) => {
                    setLoading(true)
                    const type = params.row.type;
                    console.log(type)
                    setOpen(!open)
                    setTypeEdit(type);
                    setTimeout(() => {
                        setLoading(false)
                    }, 3000)
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
    type?.map((itemType, indexType) => {
        rows.push({ stt: indexType + 1, name: itemType.name, catalog: itemType.catalogTypeData.name, description: itemType.description, id: itemType.id, type: itemType });
    })

    return (
        <Box sx={{ height: "80vh", width: '100%' }}>
            <ModalEditTypeBook
                isOpen={open}
                toggleModal={() => {
                    setOpen(!open)
                }}
                typeBookEdit={typeEdit}
            />
            <DataGrid
                sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
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
        type: state.manager.type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getType: (id) => dispatch(actions.getType(id)),
        deleteType: (id) => dispatch(actions.deleteType(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeDataGrid);