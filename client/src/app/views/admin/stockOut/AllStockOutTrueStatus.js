import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, styled } from '@mui/system'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { addDays } from 'date-fns'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
// import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker'
import {
    SearchBox,
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
    Heading,
    SecondaryHeading,
    ThirdHeading,
    SearchIcon,
    SearchInput,
    SearchContainer,
    DateContainer,
    DateContainer2,
    DateChoose,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    TextField,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'

// import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
// import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
// const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
// import SearchBar from "material-ui-search-bar";
// import
import {
    getAllDataStatusTrue,
    deleteData,
} from 'app/redux/actions/admin/StockOutAction'
// import ReactSearchBox from 'react-search-box'
import { topBarHeight } from 'app/utils/constant'

// dayjs.extend(isSameOrBefore)
// dayjs.extend(isSameOrAfter)

const AllStockOutTrueStatus = () => {
    // search for all
    const [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

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
    // for panel setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // important
    let { stockOutDataTrue = [] } = useSelector((state) => state.stockOutList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataStatusTrue(searchText))
    }, [dispatch, searchText])

    // for date chooser

    // const [value2, setValue] = useState('')
    // const handleFilterDate = (newValue) => {
    //     const filteredData = stockOutDataTrue.filter((item) => {
    //         return dayjs(item.createdAt).isSameOrAfter(dayjs(newValue))
    //     })
    //     setValue(filteredData)
    // }

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ])

    // console.log('set value', value2)

    // stockOutDataTrue = value2 || stockOutDataTrue
    return (
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Stock out form', path: '/stockOutForm' },
                        { name: 'Form' },
                    ]}
                />
                {/* date chooser from--------FROM---------- */}
                <SearchBox onSearch={handleChangeSearch} />
                <DateChoose />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                {/* <DateContainer2>
                    <DateRangePicker
                        onChange={(item) => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                    /> */}
                {/* <DatePicker
                            label="From"
                            value={value2}
                            // onChange={(newValue) => {
                            //     setValue(newValue)
                            // }}
                            onChange={(newValue) => handleFilterDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
                {/* </DateContainer2> */}
                {/* <SearchIcon>
                   
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            placeholder="Search here..."
                            value={searchText}
                            autoFocus
                            onChange={(e) => handleChangeSearch(e.target.value)}
                        />
                    </SearchContainer>
                </SearchIcon> */}
            </div>
            {/* <ReactSearchBox
                placeholder="Placeholder"
                value="Doe"
                data={stockOutDataTrue.invoiceNum}
                callback={(record) => console.log(record)}
            /> */}
            <SimpleCard title="Stock out data">
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
        </ContainerTable>
    )
}

export default AllStockOutTrueStatus

////////////////////////////////////////////////////////////////////////////////////////////////
// import Accordion from '@mui/material/Accordion'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import Typography from '@mui/material/Typography'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import { Box, styled, useTheme } from '@mui/system'
// import {
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Icon,
//     TablePagination,
//     Avatar,
//     Grow,
//     IconButton,
//     TextField,
// } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     Heading,
//     SecondaryHeading,
//     ThirdHeading,
// } from 'app/components/admin/panel'
// import { Link } from 'react-router-dom'
// import MUIDataTable from 'mui-datatables'
// import {
//     Breadcrumb,
//     FlexBox,
//     Container,
//     StyledButton,
//     SimpleCard,
// } from 'app/components'
// import { H5, Small } from 'app/components/Typography'
// import React, { useState, useEffect } from 'react'
// // import
// import {
//     getAllDataStatusTrue,
//     deleteData,
// } from 'app/redux/actions/admin/StockOutAction'

// const AllStockOutTrueStatus = () => {
//     // for panel setup
//     const [expanded, setExpanded] = React.useState(false)
//     const handleChange = (panel) => (event, isExpanded) => {
//         setExpanded(isExpanded ? panel : false)
//     }

//     // important
//     let { stockOutDataTrue = [] } = useSelector((state) => state.stockOutList)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(getAllDataStatusTrue())
//     }, [dispatch])

//     // for design
//     const { palette } = useTheme()
//     const textMuted = palette.text.secondary
//     const bgError = palette.error.main
//     const bgSuccess = palette.success.main

//     const columns = [
//         {
//             name: 'stock_name ', // field name in the row object
//             label: 'Stock Name', // column title that will be shown in table
//             options: {
//                 filter: true,
//             },
//         },
//         {
//             name: 'totalBox *totalQtyInOneBox',
//             label: 'Totoal Qty',
//             options: {
//                 filter: true,
//             },
//         },
//         {
//             name: 'price',
//             label: 'Price',
//             options: {
//                 filter: true,
//             },
//         },
//     ]
//     return (
//         <Container>
//             <div className="breadcrumb">
//                 <Breadcrumb
//                     routeSegments={[
//                         { name: 'Stock out form', path: '/stockOutForm' },
//                         { name: 'Form' },
//                     ]}
//                 />
//             </div>
//             {/* <Box overflow="auto">
//                 <Box minWidth={750}> */}

//             <SimpleCard title="Stock out data">
//                 <AccordionSummary
//                     aria-controls="panel1bh-content"
//                     id="panel1bh-header"
//                 >
//                     <Heading>Invoice No</Heading>
//                     <SecondaryHeading>Hospital Name</SecondaryHeading>
//                     <ThirdHeading>Date</ThirdHeading>
//                 </AccordionSummary>
//                 {/* data print start from here*/}
//                 {stockOutDataTrue.map((subscriber, index) => (
//                     <Accordion
//                         expanded={expanded === `panel${index}`}
//                         onChange={handleChange(`panel${index}`)}
//                         key={index}
//                     >
//                         <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel2bh-content"
//                             id="panel2bh-header"
//                         >
//                             <Heading>{subscriber.invoiceNum}</Heading>
//                             <SecondaryHeading>
//                                 {subscriber.hospitalName}
//                             </SecondaryHeading>
//                             <ThirdHeading>{subscriber.createdAt}</ThirdHeading>
//                         </AccordionSummary>
//                         <AccordionDetails
//                             style={{ backgroundColor: '#F5F5F5' }}
//                         >
//                             <MUIDataTable
//                                 title={'All Hospital'}
//                                 data={subscriber.stockOutDetail}
//                                 columns={columns}
//                                 options={{
//                                     filterType: 'checkbox',
//                                     responsive: 'standard',
//                                     // filter: true,
//                                     // sort: true,
//                                     // selectableRows: "none", // set checkbox for each row
//                                     // search: false, // set search option
//                                     // filter: false, // set data filter option
//                                     // download: false, // set download option
//                                     // print: false, // set print option
//                                     // pagination: true, //set pagination option
//                                     // viewColumns: false, // set column option
//                                     elevation: 1,
//                                     rowsPerPageOptions: [10, 20, 40, 80, 100],
//                                     customSearchRender: (
//                                         searchText,
//                                         handleSearch,
//                                         hideSearch,
//                                         options
//                                     ) => {
//                                         return (
//                                             <Grow
//                                                 appear
//                                                 in={true}
//                                                 timeout={300}
//                                             >
//                                                 <TextField
//                                                     variant="outlined"
//                                                     size="small"
//                                                     fullWidth
//                                                     onChange={({
//                                                         target: { value },
//                                                     }) => handleSearch(value)}
//                                                     InputProps={{
//                                                         style: {
//                                                             paddingRight: 0,
//                                                         },
//                                                         startAdornment: (
//                                                             <Icon
//                                                                 fontSize="small"
//                                                                 sx={{ mr: 1 }}
//                                                             >
//                                                                 search
//                                                             </Icon>
//                                                         ),
//                                                         endAdornment: (
//                                                             <IconButton
//                                                                 onClick={
//                                                                     hideSearch
//                                                                 }
//                                                             >
//                                                                 <Icon fontSize="small">
//                                                                     clear
//                                                                 </Icon>
//                                                             </IconButton>
//                                                         ),
//                                                     }}
//                                                 />
//                                             </Grow>
//                                         )
//                                     },
//                                 }}
//                             />

//                         </AccordionDetails>
//                     </Accordion>
//                 ))}
//                 {/* </Box> */}
//             </SimpleCard>
//         </Container>
//     )
// }

// export default AllStockOutTrueStatus
