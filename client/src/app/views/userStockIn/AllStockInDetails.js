import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    IconButton,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
    Heading,
    SecondaryHeading,
    ThirdHeading,
} from 'app/components/MyComponents/panel'
import {
    Container,
    StyledTable,
} from '../../components/MyComponents/table/index'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
// important
// import {
//     getAllDataStatusFalse,
//     deleteData,
// } from 'app/redux/actions/StockOutAction'
import {
    getAllDataStatusTrue,
    statusChange,
} from 'app/redux/actions/user/StockInUserAction'
import moment from 'moment'

const PendingStockOut = () => {
    //for pagination purposes
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    // for penal expand
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    // completed

    let { stockInDataTrue = [] } = useSelector((state) => state.stockInUserList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusTrue())
    }, [dispatch])

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
            {stockInDataTrue.length == 0 || stockInDataTrue == undefined ? (
                <h1> You did't received anything in past</h1>
            ) : (
                <SimpleCard title="Stock out inpending">
                    <Box width="100%">
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Heading>Invoice No</Heading>
                            {/* <SecondaryHeading>Hospital Name</SecondaryHeading> */}
                            <ThirdHeading>Date</ThirdHeading>
                        </AccordionSummary>
                        {/* data print start from here*/}
                        {stockInDataTrue
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
                                        <Heading>
                                            {subscriber.invoiceNum}
                                        </Heading>
                                        {/* <SecondaryHeading>
                                            {subscriber.hospitalName}
                                        </SecondaryHeading> */}
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
                                                    <TableCell>
                                                        Total Qty
                                                    </TableCell>
                                                    <TableCell>Price</TableCell>
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
                            count={stockInDataTrue.length}
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

export default PendingStockOut

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
// import {
//     getAllDataStatusTrue,
//     statusChange,
// } from 'app/redux/actions/user/StockInUserAction'
// import { Link } from 'react-router-dom'
// import { Breadcrumb, SimpleCard } from 'app/components'
// import {
//     Container,
//     StyledTable,
// } from '../../components/MyComponents/table/index'
// import moment from 'moment'

// const AllStockInDetails = () => {
//     let { stockInDataTrue } = useSelector((state) => state.stockInUserList)

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllDataStatusTrue())
//     }, [dispatch])

//     // if (wereHouseStockData.length === 0) {
//     //     return <h2>No Stocks to display...</h2>
//     // }
//     // console.log(stockOutDataFalse)
//     var stockOutDatas = stockInDataTrue || []
//     // console.log(stockOutDatas)
//     const [rowsPerPage, setRowsPerPage] = React.useState(5)
//     const [page, setPage] = React.useState(0)

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage)
//     }

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value)
//         setPage(0)
//     }
//     return (
//         <Container>
//             <div className="breadcrumb">
//                 <Breadcrumb
//                     routeSegments={[
//                         { name: 'Add Stock', path: '/addStock' },
//                         { name: 'Table' },
//                     ]}
//                 />
//             </div>

//             <SimpleCard title="Stocks List">
//                 <Box width="100%" overflow="auto">
//                     <StyledTable>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Hospital Name</TableCell>
//                                 <TableCell>Stock Name</TableCell>
//                                 <TableCell>Total Qty</TableCell>
//                                 <TableCell>Price</TableCell>

//                                 <TableCell>Date</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {stockOutDatas
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
//                                             {subscriber.price
//                                                 ? subscriber.price
//                                                 : 0}
//                                         </TableCell>

//                                         <TableCell>
//                                             {subscriber.createdAt}
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </StyledTable>

//                     <TablePagination
//                         sx={{ px: 2 }}
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         count={stockOutDatas.length}
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
//         </Container>
//     )
// }

// export default AllStockInDetails
