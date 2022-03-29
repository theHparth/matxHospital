// export default PreviousSellingEntryManage

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
    getAllDataTodaySelling,
    setEditData,
    deleteData,
} from 'app/redux/actions/userCreatedByAdmin/TodaySellingUserAction'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Container, StyledTable } from 'app/components/admin/table/index'
import moment from 'moment'

const PreviousSellingEntryManage = () => {
    let { todaySellingData } = useSelector(
        (state) => state.todaySellingUserList
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataTodaySelling())
    }, [dispatch])

    // if (wereHouseStockData.length === 0) {
    //     return <h2>No Stocks to display...</h2>
    // }
    // console.log(stockOutDataFalse)
    var todaySellingDatas = todaySellingData || []
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
                                <TableCell>Stock Name</TableCell>
                                <TableCell>Total Qty</TableCell>

                                <TableCell>Date</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todaySellingDatas
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
                                            {subscriber.totalBox *
                                                subscriber.totalQtyInOneBox}
                                        </TableCell>

                                        <TableCell>
                                            {subscriber.createdAt}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton>
                                                <Icon color="error">
                                                    <Link
                                                        to={`/newEntryForm`}
                                                        onClick={() =>
                                                            dispatch(
                                                                setEditData(
                                                                    subscriber
                                                                )
                                                            )
                                                        }
                                                    >
                                                        edit
                                                    </Link>
                                                </Icon>
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
                        count={todaySellingDatas.length}
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

export default PreviousSellingEntryManage
