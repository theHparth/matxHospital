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
    SearchBox,
    DateChoose,
    MyAlert,
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
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import moment from 'moment'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

// important
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/WareHouseAction'

const WereHouseStock = () => {
    //for printing and deleting
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
        dispatch(getAllData({}))
    }

    const { vendorname } = useParams()

    // search for all
    let [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

    // for date search
    let [searchDate, setSearchDate] = React.useState({})

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

    let {
        wereHouseStockData = [],
        alertType,
        showAlert,
        clearValues,
        isLoading,
        isEditing,
        alertText,
    } = useSelector((state) => state.wareHouseStockList)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     var state = {}
    //     dispatch(getAllData(state))
    // }, [dispatch])
    useEffect(() => {
        var new_dates = []
        if (Array.isArray(searchDate)) {
            new_dates.push(dayjs(searchDate[0]).format('YYYY-MM-DD'))
            new_dates.push(dayjs(searchDate[1]).format('YYYY-MM-DD'))
        }

        var state = { searchText, new_dates, vendorname }
        dispatch(getAllData(state))
    }, [dispatch, searchText, searchDate])

    if (vendorname) {
        wereHouseStockData = wereHouseStockData.filter((date) => {
            return date.vendor_name.toLowerCase() === vendorname.toLowerCase()
        })
    }
    return (
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Stock', path: '/addStock' },
                        { name: 'Table' },
                    ]}
                />
                <SearchBox
                    onSearch={handleChangeSearch}
                    onSearchValueChange={searchText}
                />
                <DateChoose dateProjection={(state) => setSearchDate(state)} />
            </div>
            {wereHouseStockData.length == 0 ||
            wereHouseStockData == undefined ? (
                <h1> No data Found</h1>
            ) : (
                <SimpleCard>
                    <Box width="100%">
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Heading>Invoice No</Heading>
                            <SecondaryHeading>Vendor Name</SecondaryHeading>
                            <ThirdHeading>Date</ThirdHeading>
                        </AccordionSummary>
                        {/* data print start from here*/}
                        {wereHouseStockData
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
                                            {subscriber.invoiceNumStockIn}
                                        </Heading>
                                        <SecondaryHeading>
                                            {subscriber.vendor_name}
                                        </SecondaryHeading>
                                        <ThirdHeading>
                                            {moment(
                                                subscriber.createdAt
                                            ).format('MMM Do, YYYY')}
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
                                                    {subscriber.stockInNote && (
                                                        <TableCell>
                                                            Note
                                                        </TableCell>
                                                    )}
                                                    <TableCell align="right">
                                                        <IconButton
                                                            onClick={() =>
                                                                dispatch(
                                                                    setEditData(
                                                                        subscriber
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Link
                                                                to={`/addStockInWereHouse`}
                                                            >
                                                                <Icon color="error">
                                                                    edit
                                                                </Icon>
                                                            </Link>
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    subscriber._id
                                                                )
                                                            }
                                                        >
                                                            <Icon color="error">
                                                                close
                                                            </Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subscriber.stockInDetail.map(
                                                    (subscribers, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {
                                                                    subscribers.stock_name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {subscribers.totalBox *
                                                                    subscribers.totalQtyInOneBox}
                                                            </TableCell>
                                                            <TableCell>
                                                                ${' '}
                                                                {subscribers.price
                                                                    ? subscribers.price
                                                                    : 0}
                                                            </TableCell>
                                                            {subscriber.stockInNote && (
                                                                <TableCell>
                                                                    {
                                                                        subscriber.stockInNote
                                                                    }
                                                                </TableCell>
                                                            )}
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    )
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
                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={wereHouseStockData.length}
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
                                alrtTextToShow={alertText}
                            />
                        ) : null}
                    </Box>
                </SimpleCard>
            )}
        </ContainerTable>
    )
}

export default WereHouseStock
