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
import { Box, styled, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    setEditMinimumLimit,
    inStockUser,
} from 'app/redux/actions/userCreatedByAdmin/StockInUserAction'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
    Theme,
    StockAlert,
    MyAlert,
    StyledButton,
} from 'app/components'
import HandleEditMinimum from './HandleEditMinimum'

const InstockListUser = () => {
    let {
        presentStockUserData = [],
        showAlert,
        alertType,
        alertText,
    } = useSelector((state) => state.stockInUserList)

    // edit minimum limitconst [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    // search for all
    let [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const bgSuccess = palette.success.main

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(inStockUser())
    }, [dispatch])

    var stockDatas = presentStockUserData || []
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(inStockUser())
    }
    return (
        <ContainerTable>
            <SimpleCard title="Stocks List">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Stock Name</TableCell>
                                <TableCell align="center">
                                    Minimum Limit
                                </TableCell>

                                <TableCell align="center">Total Qty</TableCell>

                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockDatas
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {subscriber.stock_name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {subscriber.minimumLimit
                                                ? subscriber.minimumLimit
                                                : 'Please add minimum limit to show alert'}
                                        </TableCell>
                                        <TableCell
                                            sx={{ px: 0 }}
                                            align="center"
                                        >
                                            {subscriber.totalQtyUser ? (
                                                subscriber.totalQtyUser <
                                                subscriber.minimumLimit ? (
                                                    <StockAlert
                                                        bgcolor={bgSecondary}
                                                    >
                                                        {
                                                            subscriber.totalQtyUser
                                                        }{' '}
                                                        available
                                                    </StockAlert>
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgPrimary}
                                                    >
                                                        {
                                                            subscriber.totalQtyUser
                                                        }{' '}
                                                        available
                                                    </StockAlert>
                                                )
                                            ) : (
                                                <StockAlert bgcolor={bgError}>
                                                    out of stock
                                                </StockAlert>
                                            )}
                                        </TableCell>

                                        <TableCell align="center">
                                            <StyledButton
                                                sx={{
                                                    color: bgSuccess,
                                                }}
                                                onClick={() => {
                                                    dispatch(
                                                        setEditMinimumLimit(
                                                            subscriber
                                                        )
                                                    )
                                                    setShouldOpenEditorDialog(
                                                        true
                                                    )
                                                }}
                                            >
                                                <Icon color="primary">
                                                    Edit
                                                </Icon>
                                            </StyledButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={stockDatas.length}
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
                    {shouldOpenEditorDialog && (
                        <HandleEditMinimum
                            handleClose={handleDialogClose}
                            open={shouldOpenEditorDialog}
                        />
                    )}
                </Box>
                {showAlert ? (
                    <MyAlert
                        isOpen={showAlert}
                        typeSeverity={alertType}
                        alrtTextToShow={alertText}
                    />
                ) : null}
            </SimpleCard>
        </ContainerTable>
    )
}

export default InstockListUser
