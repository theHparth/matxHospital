// // export default PendingStockIn

// import {
//     IconButton,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Icon,
//     TablePagination,
// } from '@mui/material'
// import React, { useEffect } from 'react'
// import { Box, styled } from '@mui/system'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { Breadcrumb, SimpleCard } from 'app/components'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    IconButton,
    Button,
} from '@mui/material'
import {
    Heading,
    SecondaryHeading,
    ThirdHeading,
} from 'app/components/MyComponents/panel'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'
import {
    getAllDataStatusFalse,
    statusChange,
} from 'app/redux/actions/user/StockInUserAction'
import moment from 'moment'

const PendingStockIn = () => {
    let { stockInDataFalse = [] } = useSelector(
        (state) => state.stockInUserList
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusFalse())
    }, [dispatch])

    // for pagination purposes
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // for penal setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    //button style
    const StyledButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(1),
    }))

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

            <SimpleCard title="Stock out data">
                <Box width="100%">
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Heading>Invoice No</Heading>
                        <ThirdHeading>Date</ThirdHeading>
                    </AccordionSummary>
                    {/* data print start from here*/}
                    {stockInDataFalse
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
                                    <ThirdHeading>
                                        {subscriber.createdAt}
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
                                                <TableCell>
                                                    {' '}
                                                    <StyledButton
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => {
                                                            {
                                                                alert(
                                                                    "Are you sure you received this product, then you can't change status "
                                                                )
                                                                dispatch(
                                                                    statusChange(
                                                                        subscriber._id
                                                                    )
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        Pending
                                                    </StyledButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subscriber.stockOutDetail.map(
                                                (subscriberInside, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                subscriberInside.stock_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {subscriberInside.totalBox *
                                                                subscriberInside.totalQtyInOneBox}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${' '}
                                                            {subscriberInside.price
                                                                ? subscriberInside.price
                                                                : 0}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {/* status change button */}
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
                        count={stockInDataFalse.length}
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

export default PendingStockIn

//   <SimpleCard title="Stocks List">
//                 <Box width="100%" overflow="auto">
//                     <StyledTable>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Hospital Name</TableCell>
//                                 <TableCell>Stock Name</TableCell>
//                                 <TableCell>Total Qty</TableCell>
//                                 <TableCell>Price</TableCell>

//                                 <TableCell>Date</TableCell>

//                                 {/* <TableCell>Address</TableCell>
//                         <TableCell align="center">Pincode</TableCell> */}
//                                 {/* <TableCell align="center">Edit</TableCell> */}
//                                 <TableCell align="center">Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {stockInDataFalse
//                                 .slice(
//                                     page * rowsPerPage,
//                                     page * rowsPerPage + rowsPerPage
//                                 )
//                                 .map((subscriber, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>
//                                             {subscriber.hospitalName}
//                                         </TableCell>
//                                         <TableCell>
//                                             {subscriber.stock_name}
//                                         </TableCell>
//                                         <TableCell>
//                                             {subscriber.totalBox *
//                                                 subscriber.totalQtyInOneBox}
//                                         </TableCell>
//                                         <TableCell>
//                                             ${' '}
//                                             {subscriber.priceForUser
//                                                 ? subscriber.priceForUser
//                                                 : 0}
//                                         </TableCell>

//                                         <TableCell>
//                                             {subscriber.createdAt}
//                                         </TableCell>

//                                         <TableCell align="center">
//
//                                             <IconButton
//                                                 onClick={() => {
//                                                     {
//                                                         alert(
//                                                             "Are you sure you received this product, then you can't change status "
//                                                         )
//                                                         dispatch(
//                                                             statusChange(
//                                                                 subscriber._id
//                                                             )
//                                                         )
//                                                     }
//                                                 }}
//                                             >
//                                                 Change Status
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </StyledTable>

//                     <TablePagination
//                         sx={{ px: 2 }}
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         count={stockInDataFalse.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         backIconButtonProps={{
//                             'aria-label': 'Previous Page',
//                         }}
//                         nextIconButtonProps={{
//                             'aria-label': 'Next Page',
//                         }}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Box>
//             </SimpleCard>
