import {
    IconButton,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockActions'
import {
    Container,
    StyledTable,
    StockAlert,
} from 'app/components/admin/table/index'

const AllStock = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    let { stockData = [] } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
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
            {stockData.length == 0 || stockData == undefined ? (
                <h1>No stock data found..!!</h1>
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Stock Name
                                    </TableCell>
                                    <TableCell align="center">
                                        Description
                                    </TableCell>
                                    <TableCell>total value</TableCell>
                                    <TableCell>Individual Price</TableCell>

                                    <TableCell> Total Qty </TableCell>

                                    {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                {subscriber.stock_name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {subscriber.description}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price *
                                                      subscriber.totalQty
                                                    : 0}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price
                                                    : 0}
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                align="left"
                                                // colSpan={2}
                                            >
                                                {subscriber.totalQty ? (
                                                    subscriber.totalQty <
                                                    subscriber.minimumLimit ? (
                                                        <StockAlert
                                                            bgcolor={
                                                                bgSecondary
                                                            }
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    ) : (
                                                        <StockAlert
                                                            bgcolor={bgPrimary}
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    )
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgError}
                                                    >
                                                        out of stock
                                                    </StockAlert>
                                                )}
                                            </TableCell>

                                            <TableCell align="center">
                                                <Link
                                                    to={`/addStock`}
                                                    onClick={() =>
                                                        dispatch(
                                                            setEditData(
                                                                subscriber
                                                            )
                                                        )
                                                    }
                                                >
                                                    <IconButton>
                                                        <Icon color="error">
                                                            edit
                                                        </Icon>
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                            <TableCell
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
                                                <IconButton>
                                                    <Icon color="error">
                                                        close
                                                    </Icon>
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
                            count={stockData.length}
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
            )}
        </Container>
    )
}

export default AllStock