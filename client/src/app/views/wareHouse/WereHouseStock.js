import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/WareHouseAction'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'
import moment from 'moment'

const WereHouseStock = () => {
    let { wereHouseStockData } = useSelector(
        (state) => state.wareHouseStockList
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    // if (wereHouseStockData.length === 0) {
    //     return <h2>No Stocks to display...</h2>
    // }

    var wereHouseStockDatass = wereHouseStockData || []
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Stock', path: '/addStock' },
                        { name: 'Table' },
                    ]}
                />
            </div>

            <SimpleCard title="Stocks List">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Stock Name</TableCell>
                                <TableCell>Vendor Name</TableCell>
                                <TableCell>total value</TableCell>
                                <TableCell>Individual Price</TableCell>
                                <TableCell> Qty / Box </TableCell>
                                <TableCell> Total Qty </TableCell>
                                <TableCell>Date</TableCell>

                                {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                {/* <TableCell align="center">Edit</TableCell> */}
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wereHouseStockDatass
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {subscriber.stock_name}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.vendor_name}
                                        </TableCell>
                                        <TableCell>
                                            ${' '}
                                            {subscriber.price
                                                ? subscriber.price
                                                : 0}
                                        </TableCell>
                                        <TableCell>
                                            ${' '}
                                            {subscriber.price /
                                            (subscriber.totalQtyInOneBox *
                                                subscriber.totalBox)
                                                ? subscriber.price /
                                                  (subscriber.totalQtyInOneBox *
                                                      subscriber.totalBox)
                                                : 0}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.totalQtyInOneBox
                                                ? subscriber.totalQtyInOneBox
                                                : 0}
                                            /
                                            {subscriber.totalBox
                                                ? subscriber.totalBox
                                                : 0}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.totalQtyInOneBox *
                                                subscriber.totalBox}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.createdAt}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton>
                                                <Link
                                                    to={`/addStockInWereHouse`}
                                                    onClick={() =>
                                                        dispatch(
                                                            setEditData(
                                                                subscriber
                                                            )
                                                        )
                                                    }
                                                >
                                                    <Icon color="error">
                                                        edit
                                                    </Icon>
                                                </Link>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    {
                                                        alert(
                                                            'Are you sure you want to delete?'
                                                        )
                                                        dispatch(
                                                            deleteData(
                                                                subscriber._id
                                                            )
                                                        )
                                                    }
                                                }}
                                            >
                                                <Icon color="error">close</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={wereHouseStockDatass.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </SimpleCard>
        </Container>
    )
}

export default WereHouseStock
