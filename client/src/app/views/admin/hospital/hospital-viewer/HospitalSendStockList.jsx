import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard, InvoiceAutoGenerate } from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    IconButton,
} from '@mui/material'
import { Link } from 'react-router-dom'

import {
    Heading,
    SecondaryHeading,
    ThirdHeading,
} from 'app/components/admin/panel'
import { Container, StyledTable } from 'app/components/admin/table/index'
// import
import {
    getAllDataStatusTrue,
    deleteData,
    setEditData,
} from 'app/redux/actions/admin/StockOutAction'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import moment from 'moment'

const AllStockOutTrueStatus = ({ id }) => {
    //   let date = moment(createdAt)
    //   date = date.format('MMM Do, YYYY')

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // for panel setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // important
    let { stockOutDataTrue = [] } = useSelector((state) => state.stockOutList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusTrue(id))
    }, [dispatch])

    return (
        <Container>
            <SimpleCard title="Stock info">
                <Box width="100%">
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Heading>Invoice No</Heading>
                        <SecondaryHeading>Hospital Name</SecondaryHeading>
                        <ThirdHeading>Date</ThirdHeading>
                    </AccordionSummary>
                    {/* data print start from here*/}
                    {stockOutDataTrue
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                key={index}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Heading>{subscriber.invoiceNum}</Heading>
                                    <SecondaryHeading>
                                        {subscriber.hospitalName}
                                    </SecondaryHeading>
                                    <ThirdHeading>
                                        {/* {subscriber.createdAt} */}
                                        {moment(subscriber.createdAt).format(
                                            'MMM Do, YYYY'
                                        )}
                                    </ThirdHeading>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ backgroundColor: '#F5F5F5' }}
                                >
                                    <StyledTable>
                                        <TableHead
                                            style={{
                                                backgroundColor: '#EBF5FB',
                                            }}
                                        >
                                            <TableRow>
                                                <TableCell>
                                                    Stock Name
                                                </TableCell>
                                                <TableCell>Total Qty</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell align="right">
                                                    {/* <InvoiceAutoGenerate
                                                        invoiceNum={
                                                            subscriber.invoiceNum
                                                        }
                                                        createdFor={
                                                            subscriber.createdFor
                                                        }
                                                    >
                                                    </InvoiceAutoGenerate> */}
                                                    {/* > */}
                                                    <Link
                                                        to={`/invoice`}
                                                        onClick={() =>
                                                            dispatch(
                                                                setEditData(
                                                                    subscriber
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Icon>Print</Icon>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subscriber.stockOutDetail.map(
                                                (subscriber, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                subscriber.stock_name
                                                            }
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
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </StyledTable>
                                </AccordionDetails>
                            </Accordion>
                        ))}
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
        </Container>
    )
}

export default AllStockOutTrueStatus