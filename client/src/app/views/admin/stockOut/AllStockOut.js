import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import { useLocation, Link } from 'react-router-dom' // my import
import moment from 'moment'
import {
    SearchBox,
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
    Heading,
    SecondaryHeading,
    ThirdHeading,
    DateChoose,
    StyledButton,
    InvoiceDetails,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import {
    allStockOutDatas,
    setEditData,
} from 'app/redux/actions/admin/StockOutAction'

const AllStockOutTrueStatus = ({ id }) => {
    // for printing
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)
    const [info, setInfo] = useState()
    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        // dispatch(getHospitalsData())
    }

    // search for all
    let [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

    // for date search
    let [searchDate, setSearchDate] = React.useState({})

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

    const location = useLocation()

    var privatrRoute = false
    var searchStatus = true
    if (location.pathname == '/pendingStockOut') {
        searchStatus = false
        privatrRoute = true
    }

    let { allStockOutData = [] } = useSelector((state) => state.stockOutList)

    const dispatch = useDispatch()

    useEffect(() => {
        var new_dates = []
        if (Array.isArray(searchDate)) {
            new_dates.push(dayjs(searchDate[0]).format('YYYY-MM-DD'))
            new_dates.push(dayjs(searchDate[1]).format('YYYY-MM-DD'))
        }

        var state = { searchText, new_dates, id, searchStatus }
        dispatch(allStockOutDatas(state))
    }, [dispatch, searchText, searchDate, searchStatus])

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
                <SearchBox
                    onSearch={handleChangeSearch}
                    onSearchValueChange={searchText}
                />
                <DateChoose dateProjection={(state) => setSearchDate(state)} />
            </div>

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
                    {allStockOutData
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
                                                <TableCell>
                                                    <StyledButton
                                                        onClick={() => {
                                                            setShouldOpenEditorDialog(
                                                                true
                                                            )
                                                            setInfo(subscriber)
                                                        }}
                                                    >
                                                        <Icon color="primary">
                                                            print
                                                        </Icon>
                                                    </StyledButton>
                                                    {privatrRoute && (
                                                        <StyledButton
                                                            onClick={() =>
                                                                dispatch(
                                                                    setEditData(
                                                                        subscriber
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Link
                                                                to={`/stockOutForm`}
                                                            >
                                                                <Icon color="error">
                                                                    edit
                                                                </Icon>
                                                            </Link>
                                                        </StyledButton>
                                                    )}
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
                    {shouldOpenEditorDialog && (
                        <InvoiceDetails
                            handleClose={handleDialogClose}
                            open={shouldOpenEditorDialog}
                            invoiceInfo={info}
                        />
                    )}
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={allStockOutData.length}
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
