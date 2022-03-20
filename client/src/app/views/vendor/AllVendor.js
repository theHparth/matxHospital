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
import React, { useEffect, useState } from 'react'
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
import Modal from 'app/components/Modal/Modal'
import Invoice from 'app/components/Invoice/Invoice'
import VendorInfo from 'app/components/Invoice/VendorInfo'

const AllVendor = () => {
    const [search, setSearch] = useState('')
    const vendorData = useSelector(
        (state) => state.vendorList
    ).vendorData.filter(
        (vendor) =>
            vendor.vendor_name.toLowerCase().includes(search.toLowerCase()) ||
            vendor.email.toLowerCase().includes(search.toLowerCase())
    )
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
    const [showModal, setShowModal] = useState(false)
    const [currentVendor, setCurrentVendor] = useState({})

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const changeModal = (subscriber) => {
        setShowModal(!showModal)
        setCurrentVendor(subscriber)
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
                <input
                    type="text"
                    placeholder="Vendor Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                {/* <TableCell>Contect</TableCell> */}
                                <TableCell>Email</TableCell>
                                {/* <TableCell>Address</TableCell> */}
                                {/* <TableCell align="center">Pincode</TableCell> */}
                                <TableCell align="center">Edit</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Print</TableCell>
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
                                        {/* <TableCell>
                                            {subscriber.contect}
                                        </TableCell> */}
                                        <TableCell>
                                            {subscriber.email}
                                        </TableCell>
                                        {/* <TableCell>
                                            {subscriber.address}
                                        </TableCell> */}
                                        {/* <TableCell align="center">
                                            {subscriber.pincode}
                                        </TableCell> */}
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
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    changeModal(subscriber)
                                                }}
                                            >
                                                <Icon color="primary">
                                                    print
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

                {showModal ? (
                    <Modal>
                        {console.log('model open')}
                        <div>
                            <h1>Model Open</h1>
                            <VendorInfo
                                changeModal={changeModal}
                                currentVendor={currentVendor}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    width: '200px',
                                    justifyContent: 'space-between',
                                    margin: 'auto',
                                }}
                            >
                                <button onClick={changeModal}>Close</button>
                                <button>Print</button>
                            </div>
                        </div>
                    </Modal>
                ) : null}
            </SimpleCard>
        </Container>
    )
}

export default AllVendor
