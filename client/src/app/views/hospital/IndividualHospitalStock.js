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
import { hospitalStockInformation } from 'app/redux/actions/HospitalActions'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'

const IndividualHospitalStock = () => {
    const { id } = useParams()
    // console.log('idd--------------------------------------', id)
    const { hospitalIndividualStockData = [] } = useSelector(
        (state) => state.hospitalList
    )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hospitalStockInformation(id))
    }, [dispatch])

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
                        { name: 'All Hospital', path: '/allHospitals' },
                        { name: 'Table' },
                    ]}
                />
            </div>

            <SimpleCard title={'Hospital Data List'}>
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hospital Name</TableCell>
                                <TableCell>Stock Name</TableCell>
                                <TableCell>Totoal Qty.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitalIndividualStockData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {subscriber.hospitalName}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.stock_name}
                                        </TableCell>
                                        <TableCell>
                                            {subscriber.totalQtyUser}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={hospitalIndividualStockData.length}
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

export default IndividualHospitalStock
