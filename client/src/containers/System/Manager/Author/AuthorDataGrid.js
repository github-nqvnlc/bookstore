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
import ModalEditAuthor from './ModalEditAuthor';

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

const AuthorDataGrid = (props) => {
    const [author, setAuthor] = React.useState([])
    const [authorEdit, setAuthorEdit] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        setAuthor(props.author)
    })

    const toggleModalEdit = () => {
        setOpen(!open)
    }
    
    const columns = [
        { field: 'stt', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Author Name',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description about Author',
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
                        props.deleteAuthor(id)
                        setLoading(false)
                    }, 3000)
                };
                const onClickEdit = (e) => {
                    setLoading(true)
                    const author = params.row.author;
                    setOpen(!open)
                    setAuthorEdit(author);
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
    author?.map((itemAuthor, indexAuthor) => {
        rows.push({ stt: indexAuthor + 1, name: itemAuthor.name, description: itemAuthor.description, id: itemAuthor.id, author: itemAuthor });
    })

    return (
        <Box sx={{ height: "80vh", width: '100%' }}>
            <ModalEditAuthor
                isOpen={open}
                toggleModal={() => {
                    setOpen(!open)
                }}
                authorEdit={authorEdit}
            />
            <DataGrid
                sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                rows={rows}
                columns={columns}
                pageSize={5}
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
        author: state.manager.author,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthor: (id) => dispatch(actions.getAuthor(id)),
        deleteAuthor: (id) => dispatch(actions.deleteAuthor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDataGrid);