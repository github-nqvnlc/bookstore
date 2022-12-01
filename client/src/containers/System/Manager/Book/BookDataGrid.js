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
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../../../../store/actions";
import { Button, ButtonGroup, Stack } from '@mui/material';
import ModalEditBook from './ModalEditBook';
import CurrencyFormat from 'react-currency-format';

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
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const BookDataGrid = (props) => {
    const history = useHistory()
    const [book, setBook] = React.useState([])
    const [bookEdit, setBookEdit] = React.useState({})
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setBook(props.book)
    }, [])


    const columns = [
        { field: 'stt', headerName: '#', width: 50 },
        {
            field: 'image',
            headerName: 'Image Book',
            width: 200,
            hide: true,
            renderCell: (params) => {
                let image64 = new Buffer(params.row.image, "base64").toString("binary");
                return (
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItem="center"
                        sx={{
                            width: 200,
                            height: 200,
                        }}
                    >
                        <img
                            style={{
                                width: 150,
                                height: 150,
                            }}
                            src={image64} />

                    </Stack>
                )
            }
        },
        {
            field: 'name',
            headerName: 'Book Name',
            width: 250,
            editable: false,
        },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'publisher', headerName: 'Publisher', width: 150 },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            renderCell: (params) => {
                return (
                    <CurrencyFormat
                        value={params.row.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                    />
                )
            }
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 90,
            renderCell: (params) => {
                return (
                    <CurrencyFormat
                        value={Math.floor(params.row.discount * 100)}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" %"}
                    />
                )
            }
        },
        { field: 'category', headerName: 'Category Book', hide: true, width: 150 },
        { field: 'catalog', headerName: 'Catalog Book', hide: true, width: 150 },
        { field: 'type', headerName: 'Type Book', hide: true, width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        {
            field: 'description',
            headerName: 'Description about Book',
            width: 200,
            hide: true,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 250,
            editable: false,
            softable: false,
            renderCell: (params) => {
                const onClickDelete = (e) => {
                
                    const id = params.row.id;
                    props.deleteBook(id)
                };
                const onClickEdit = (e) => {
                    const book = params.row.book;
                    setOpen(!open)
                    setBookEdit(book);
                }

                const onClickDetail = (e) => {
                    history.push(`/system/manager/book/${params.row.id}`)
                }
                return (
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-around" spacing={1}>
                        <Button variant="outlined" color="success" size="small" onClick={onClickEdit}>Edit</Button>
                        <Button variant="outlined" color="primary" size="small" onClick={onClickDetail}>Detail</Button>
                        <Button variant="outlined" color="error" size="small" onClick={onClickDelete}>Delete</Button>
                    </Stack>
                );
            },
        },
    ];



    const rows = [];
    book?.map((itemBook, indexBook) => {
        rows.push({
            stt: indexBook + 1,
            id: itemBook.id,
            image: itemBook.image,
            name: itemBook.name,
            author: itemBook.authorData.name,
            publisher: itemBook.publisherData.name,
            price: itemBook.price,
            discount: itemBook.discount,
            category: itemBook.categoryData.name,
            catalog: itemBook.catalogData.name,
            type: itemBook.typeData.name,
            quantity: itemBook.quantity,
            description: itemBook.description,
            book: itemBook
        });
    })

    return (
        <>
            <ModalEditBook
                isOpen={open}
                toggleModal={() => {
                    setOpen(!open)
                }}
                bookEdit={bookEdit}
                checkEdit={"ALL"}
            />

            <Box sx={{ height: "80vh", width: '100%' }}>

                <DataGrid
                    sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                    rows={rows} rowHeight={200}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    components={{
                        Toolbar: CustomToolbar,
                        Pagination: CustomPagination,
                        LoadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                />
            </Box>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        book: state.manager.book,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBook: (id) => dispatch(actions.getBook(id)),
        deleteBook: (id) => dispatch(actions.deleteBook(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDataGrid);