// export default PendingStockIn

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
    getAllDataStatusTrue,
    statusChange,
} from 'app/redux/actions/user/StockInUserAction'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'
import moment from 'moment'

const AllStockInDetails = () => {
    let { stockInDataTrue } = useSelector((state) => state.stockInUserList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusTrue())
    }, [dispatch])

    // if (wereHouseStockData.length === 0) {
    //     return <h2>No Stocks to display...</h2>
    // }
    // console.log(stockOutDataFalse)
    var stockOutDatas = stockInDataTrue || []
    // console.log(stockOutDatas)
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
                                <TableCell>Hospital Name</TableCell>
                                <TableCell>Stock Name</TableCell>
                                <TableCell>Total Qty</TableCell>
                                <TableCell>Price</TableCell>

                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockOutDatas
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {subscriber.hospitalName}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.stock_name}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.totalBox *
                                                subscriber.totalQtyInOneBox}
                                        </TableCell>
                                        <TableCell>
                                            ${' '}
                                            {subscriber.priceForUser
                                                ? subscriber.priceForUser
                                                : 0}
                                        </TableCell>

                                        <TableCell>
                                            {subscriber.createdAt}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={stockOutDatas.length}
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

export default AllStockInDetails
