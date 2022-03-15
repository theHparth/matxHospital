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
    getHospitalsData,
    setEditHospital,
    deleteHospital,
} from 'app/redux/actions/HospitalActions'
import { Link, useParams } from 'react-router-dom'
import { sub } from 'date-fns/esm'

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

const HospitalData = (props) => {
    const { hospitalsData } = useSelector((state) => state.hospitalList)
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(props.location.state)
        dispatch(getHospitalsData())
    }, [])

    // useEffect(() => {
    //     const { userData } = useParams()
    //     console.log(userData)
    // }, [userData])

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const data = (id) => {
        return setEditHospital(id)
    }

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
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
                                    {subscriber.address}
                                </TableCell>
                                <TableCell>{subscriber.email}</TableCell>
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
                                                setEditHospital(subscriber._id)
                                            )
                                        }
                                    >
                                        <IconButton>
                                            <Icon color="error">edit</Icon>
                                        </IconButton>
                                    </Link>
                                </TableCell>
                                <TableCell
                                    onClick={() =>
                                        dispatch(deleteHospital(subscriber._id))
                                    }
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
    )
}

export default HospitalData
