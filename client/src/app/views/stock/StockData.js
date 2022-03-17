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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const StockData = (props) => {
    const { stockData } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])
    console.log(stockData)
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
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Vendor Name</TableCell>
                        <TableCell>Qty.</TableCell>
                        <TableCell>Price</TableCell>
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
                                <TableCell>{subscriber.vendor_name}</TableCell>
                                <TableCell>{subscriber.qty}</TableCell>
                                <TableCell>{subscriber.price}</TableCell>
                                <TableCell>{subscriber.address}</TableCell>
                                <TableCell align="center">
                                    <Link
                                        to={`/addStock`}
                                        onClick={() =>
                                            dispatch(setEditData(subscriber))
                                        }
                                    >
                                        <IconButton>
                                            <Icon color="error">edit</Icon>
                                        </IconButton>
                                    </Link>
                                </TableCell>
                                <TableCell
                                    onClick={() => {
                                        {
                                            alert(
                                                'Are you sure you want to delete?'
                                            )
                                            dispatch(deleteData(subscriber._id))
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
    )
}

export default StockData
