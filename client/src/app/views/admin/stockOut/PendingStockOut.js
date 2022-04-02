import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import {
    Breadcrumb,
    SimpleCard,
    Heading,
    SecondaryHeading,
    ThirdHeading,
    ContainerTable,
    StyledTable,
} from 'app/components'
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

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
// important
import {
    getAllDataStatusFalse,
    deleteData,
} from 'app/redux/actions/admin/StockOutAction'
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

    let { stockOutDataFalse = [] } = useSelector((state) => state.stockOutList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusFalse())
    }, [dispatch])

    return (
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Stock', path: '/addStock' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            {stockOutDataFalse.length == 0 || stockOutDataFalse == undefined ? (
                <h1> No stock in pending list</h1>
            ) : (
                <SimpleCard title="Stock out inpending">
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
                        {stockOutDataFalse
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
                                        <SecondaryHeading>
                                            {subscriber.hospitalName}
                                        </SecondaryHeading>
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
                                                    <TableCell align="right">
                                                        <IconButton>
                                                            <Link
                                                                to={`/addStockInWereHouse`}
                                                            >
                                                                <Icon color="error">
                                                                    edit
                                                                </Icon>
                                                            </Link>
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
                                                            <TableCell></TableCell>
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
                            count={stockOutDataFalse.length}
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

export default PendingStockOut
// import MUIDataTable from 'mui-datatables'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import Paper from '@material-ui/core/Paper'

// // important
// import { Link } from 'react-router-dom'

// import { useDispatch, useSelector } from 'react-redux'
// import React, { useEffect } from 'react'
// // important
// import {
//     getAllDataStatusFalse,
//     deleteData,
// } from 'app/redux/actions/admin/StockOutAction'
// import moment from 'moment'

// const ExpandableRowTable = (props) => {
//     const columns = [
//         {
//             name: 'invoiceNum',
//             label: 'Invoice number',
//         },
//         {
//             name: 'hospitalName',
//             label: 'Hospital Name',
//         },
//         {
//             name: 'createdAt',
//             label: 'Date',
//         },
//     ]

//     let { stockOutDataFalse = [] } = useSelector((state) => state.stockOutList)

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllDataStatusFalse())
//     }, [dispatch])

//     const data = [
//         ['Gabby George', 'Business Analyst', 'Minneapolis', 30, 100000],
//         ['Business Analyst', 'Business Consultant', 'Dallas', 55, 200000],
//         ['Jaden Collins', 'Attorney', 'Santa Ana', 27, 500000],
//         ['Franky Rees', 'Business Analyst', 'St. Petersburg', 22, 50000],
//         ['Aaren Rose', 'Business Consultant', 'Toledo', 28, 75000],
//         ['Blake Duncan', 'Business Management Analyst', 'San Diego', 65, 94000],
//         ['Frankie Parry', 'Agency Legal Counsel', 'Jacksonville', 71, 210000],
//         ['Lane Wilson', 'Commercial Specialist', 'Omaha', 19, 65000],
//         ['Robin Duncan', 'Business Analyst', 'Los Angeles', 20, 77000],
//         ['Mel Brooks', 'Business Consultant', 'Oklahoma City', 37, 135000],
//         ['Harper White', 'Attorney', 'Pittsburgh', 52, 420000],
//         ['Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, 150000],
//         ['Frankie Long', 'Industrial Analyst', 'Austin', 31, 170000],
//         ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, 90000],
//         ['Justice Mann', 'Business Consultant', 'Chicago', 24, 133000],
//         [
//             'Addison Navarro',
//             'Business Management Analyst',
//             'New York',
//             50,
//             295000,
//         ],
//         ['Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, 200000],
//         ['Eli Mejia', 'Commercial Specialist', 'Long Beach', 65, 400000],
//         ['Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, 110000],
//         ['Danny Leon', 'Computer Scientist', 'Newark', 60, 220000],
//         ['Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, 180000],
//         ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, 99000],
//         ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, 90000],
//         ['Terry Macdonald', 'Commercial Specialist', 'Miami', 39, 140000],
//         ['Justice Mccarthy', 'Attorney', 'Tucson', 26, 330000],
//         ['Silver Carey', 'Computer Scientist', 'Memphis', 47, 250000],
//         ['Franky Miles', 'Industrial Analyst', 'Buffalo', 49, 190000],
//         ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, 80000],
//         [
//             'Gabby Strickland',
//             'Business Process Consultant',
//             'Scottsdale',
//             26,
//             45000,
//         ],
//         ['Mason Ray', 'Computer Scientist', 'San Francisco', 39, 142000],
//     ]

//     function createData(name, calories, fat, carbs, protein) {
//         return { name, calories, fat, carbs, protein }
//     }

//     const rows = [
//         createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//         createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//         createData('Eclair', 262, 16.0, 24, 6.0),
//         createData('Cupcake', 305, 3.7, 67, 4.3),
//         createData('Gingerbread', 356, 16.0, 49, 3.9),
//     ]

//     const options = {
//         filter: true,
//         onFilterChange: (changedColumn, filterList) => {
//             console.log(changedColumn, filterList)
//         },
//         selectableRows: 'single',
//         filterType: 'dropdown',
//         // responsive: 'scrollMaxHeight',
//         // rowsPerPage: 10,
//         expandableRows: true,
//         renderExpandableRow: (rowData, rowMeta) => {
//             console.log(rowData, '======', rowMeta)
//             return (
//                 <React.Fragment>
//                     <tr>
//                         <td colSpan={6}>
//                             <TableContainer component={Paper}>
//                                 <Table
//                                     style={{ minWidth: '650' }}
//                                     aria-label="simple table"
//                                 >
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Stock Name</TableCell>
//                                             <TableCell align="right">
//                                                 Total Quantity
//                                             </TableCell>
//                                             <TableCell align="right">
//                                                 Price
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {stockOutDataFalse.stockOutDetail.map(
//                                             (row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell
//                                                         component="th"
//                                                         scope="row"
//                                                     >
//                                                         {row.stock_name}
//                                                     </TableCell>
//                                                     <TableCell align="right">
//                                                         {row.totalBox *
//                                                             row.totalQtyInOneBox}
//                                                     </TableCell>
//                                                     <TableCell align="right">
//                                                         ${' '}
//                                                         {row.price
//                                                             ? row.price
//                                                             : 0}{' '}
//                                                         ${' '}
//                                                     </TableCell>
//                                                 </TableRow>
//                                             )
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </td>
//                     </tr>
//                 </React.Fragment>
//             )
//         },
//         page: 1,
//     }
//     return (
//         <MUIDataTable
//             title={'ACME Employee list'}
//             data={stockOutDataFalse}
//             columns={columns}
//             options={options}
//         />
//     )
// }

// export default ExpandableRowTable
