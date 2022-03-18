import { Breadcrumb, SimpleCard } from 'app/components'
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
    getAllVendor,
    setEditData,
    deleteData,
} from 'app/redux/actions/VendorActions'
import { Link } from 'react-router-dom'

import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'

const AllVendor = () => {
    const { vendorData = [] } = useSelector((state) => state.vendorList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVendor())
    }, [dispatch])

    // if (vendorData.length === 0) {
    //     return <h2>No Stocks to display...</h2>
    // }
    // var vendorDatass = vendorData || []
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
                        { name: 'Add Vendor', path: '/addVendor' },
                        { name: 'Form' },
                    ]}
                />
            </div>

            <SimpleCard title="Vendor List">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Contect</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell align="center">Pincode</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vendorData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {subscriber.vendor_name}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.contect}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.email}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.address}
                                        </TableCell>
                                        <TableCell align="center">
                                            {subscriber.pincode}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                to={`/addVendor`}
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
                        count={vendorData.length}
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

export default AllVendor
