import { Box, styled } from '@mui/system'
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
import { useDispatch, useSelector } from 'react-redux'
import {
    getHospitalsData,
    setEditHospital,
    deleteHospital,
    hospitalStockInformation,
} from 'app/redux/actions/HospitalActions'
import { Link } from 'react-router-dom'

import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'

const AllHospital = () => {
    const { hospitalsData = [] } = useSelector((state) => state.hospitalList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHospitalsData())
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
                        { name: 'Add Hospital', path: '/addHospital' },
                        { name: 'form' },
                    ]}
                />
            </div>
            {hospitalsData.length == 0 || hospitalsData == undefined ? (
                <h1>No hospital data found..!!</h1>
            ) : (
                <SimpleCard title="Hospital List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Hospital Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Pincode</TableCell>
                                    <TableCell>Contect</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hospitalsData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">
                                                <Link
                                                    to={`/hospitalData/${subscriber._id}`}
                                                    onClick={() =>
                                                        dispatch(
                                                            hospitalStockInformation(
                                                                subscriber._id
                                                            )
                                                        )
                                                    }
                                                >
                                                    {subscriber.hospitalName}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {subscriber.address}
                                            </TableCell>
                                            <TableCell>
                                                {subscriber.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {subscriber.pincode}
                                            </TableCell>
                                            <TableCell align="left">
                                                {subscriber.contect}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    to={`/addHospital`}
                                                    onClick={() =>
                                                        dispatch(
                                                            setEditHospital(
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
                                                            deleteHospital(
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
                            count={hospitalsData.length}
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

export default AllHospital
