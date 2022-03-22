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
} from 'app/redux/actions/StockActions'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'

const AllStock = () => {
    let { stockData } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    var stockDatas = stockData || []
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
                                <TableCell align="center">Stock Name</TableCell>
                                <TableCell align="center">
                                    Description
                                </TableCell>
                                <TableCell>total value</TableCell>
                                <TableCell>Individual Price</TableCell>
                                <TableCell> Qty / Box </TableCell>
                                <TableCell> Total Qty </TableCell>
                                <TableCell>Date</TableCell>

                                {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                <TableCell align="center">Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockDatas
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
                                            <Link
                                                to={`/addStock`}
                                                onClick={() =>
                                                    dispatch(
                                                        setEditData(subscriber)
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
                        count={stockDatas.length}
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

export default AllStock
