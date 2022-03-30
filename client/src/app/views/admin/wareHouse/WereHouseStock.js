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
} from 'app/redux/actions/admin/WareHouseAction'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
} from 'app/components'
import {} from 'app/components/admin/table/index'
import moment from 'moment'

const WereHouseStock = () => {
    let { wereHouseStockData = [] } = useSelector(
        (state) => state.wareHouseStockList
    )

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
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Add stock in werehouse',
                            path: '/addStockInWereHouse',
                        },
                        { name: 'Form' },
                    ]}
                />
            </div>

            {wereHouseStockData.length == 0 ||
            wereHouseStockData == undefined ? (
                <h1> No data found</h1>
            ) : (
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
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wereHouseStockData
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
                                                {subscriber.price &&
                                                subscriber.totalQtyInOneBox
                                                    ? subscriber.price *
                                                      subscriber.totalQtyInOneBox *
                                                      subscriber.totalBox
                                                    : 0}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price
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
                                                    <Icon color="error">
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
                            count={wereHouseStockData.length}
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
        </ContainerTable>
    )
}

export default WereHouseStock
