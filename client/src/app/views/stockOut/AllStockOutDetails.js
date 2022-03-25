import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllDataStatusTrue,
    deleteData,
} from 'app/redux/actions/StockOutAction'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'
import moment from 'moment'

const WereHouseStock = () => {
    let { stockOutDataTrue = [] } = useSelector((state) => state.stockOutList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusTrue())
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
            {stockOutDataTrue.length == 0 || stockOutDataTrue == undefined ? (
                <h1> No stock out details</h1>
            ) : (
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
                                {stockOutDataTrue
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
                                                {subscriber.price
                                                    ? subscriber.price
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
                            count={stockOutDataTrue.length}
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

export default WereHouseStock
