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
    InvoiceDetails,
    MyAlert,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

import {
    allStockOutDatas,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockOutAction'

const AllStockOutTrueStatus = ({ id }) => {
    // for printing and deleting pperpose
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)
    const [info, setInfo] = useState()
    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        // dispatch(getHospitalsData())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteData(hospitalDa)).then(() => {
            handleDialogClose()
            setExpanded(false)
        })
        dispatch(allStockOutDatas({ searchStatus: false }))
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

    let {
        allStockOutData = [],
        showAlert,
        alertType,
        alertText,
    } = useSelector((state) => state.stockOutList)

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
                                                {/* {subscriber.messageForHospital && (
                                                    <TableCell>Note</TableCell>
                                                )} */}

                                                <TableCell align="right">
                                                    {privatrRoute && (
                                                        <>
                                                            <Button
                                                                variant="outlined"
                                                                color="success"
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
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                            {/* <TableCell></TableCell> */}
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        subscriber._id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
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
                                                        {/* Print */}
                                                    </Button>
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
                                            {subscriber.messageForHospital && (
                                                <TableCell>
                                                    Note :{' '}
                                                    {
                                                        subscriber.messageForHospital
                                                    }
                                                </TableCell>
                                            )}
                                        </TableBody>
                                    </StyledTable>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    {shouldOpenConfirmationDialog && (
                        <ConfirmationDialog
                            open={shouldOpenConfirmationDialog}
                            onConfirmDialogClose={handleDialogClose}
                            onYesClick={handleConfirmationResponse}
                            text="Are you sure to delete?"
                        />
                    )}
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
                    {showAlert ? (
                        <MyAlert
                            isOpen={showAlert}
                            typeSeverity={alertType}
                            alrtTextToShow={
                                privatrRoute
                                    ? 'Stock activated successfully'
                                    : alertText
                            }
                        />
                    ) : null}
                </Box>
            </SimpleCard>
        </ContainerTable>
    )
}

export default AllStockOutTrueStatus
