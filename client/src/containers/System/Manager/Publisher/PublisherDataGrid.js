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
import ModalEditPublisher from './ModalEditPublisher';

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

const PublisherDataGrid = (props) => {
    const [publisher, setPublisher] = React.useState([])
    const [publisherEdit, setPublisherEdit] = React.useState({})
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setPublisher(props.publisher)
    })

    const toggleModalEdit = () => {
        setOpen(!open)
    }

    const columns = [
        { field: 'stt', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Publisher Name',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description about Publisher',
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
                    props.deletePublisher(id)
                };
                const onClickEdit = (e) => {
                    const publisher = params.row.publisher;
                    setOpen(!open)
                    setPublisherEdit(publisher);
                    console.log(publisher)
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
    publisher?.map((itemPublisher, indexPublisher) => {
        rows.push({ stt: indexPublisher + 1, name: itemPublisher.name, description: itemPublisher.description, id: itemPublisher.id, publisher: itemPublisher });
    })

    return (
        <Box sx={{ height: "80vh", width: '100%' }}>
            <ModalEditPublisher
                isOpen={open}
                toggleModal={() => {
                    setOpen(!open)
                }}
                publisherEdit={publisherEdit}
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
        publisher: state.manager.publisher,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublisher: (id) => dispatch(actions.getPublisher(id)),
        deletePublisher: (id) => dispatch(actions.deletePublisher(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDataGrid);