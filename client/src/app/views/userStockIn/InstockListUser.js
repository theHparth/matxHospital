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
    setEditMinimumLimit,
    inStockUser,
} from 'app/redux/actions/user/StockInUserAction'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'

const InstockListUser = () => {
    let { presentStockUserData, isEditing } = useSelector(
        (state) => state.stockInUserList
    )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(inStockUser())
    }, [dispatch])
    console.log('in', presentStockUserData)
    var stockDatas = presentStockUserData || []
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const editminimum = () => {
        isEditing = true
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
                                    Minimum Limit
                                </TableCell>

                                <TableCell align="center">Total Qty</TableCell>

                                {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                <TableCell align="center">Edit</TableCell>
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
                                            {subscriber.minimumLimit
                                                ? subscriber.minimumLimit
                                                : 'Please add minimum limit to show alert'}
                                        </TableCell>

                                        <TableCell align="center">
                                            {subscriber.totalQty
                                                ? subscriber.totalQty
                                                : 0}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            onClick={editminimum}
                                            // onClick={() =>
                                            //     dispatch(
                                            //         setEditMinimumLimit(
                                            //             subscriber
                                            //         )
                                            //     )
                                            // }
                                        >
                                            <IconButton>
                                                <Icon color="error">
                                                    edit minimum limit
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

export default InstockListUser
