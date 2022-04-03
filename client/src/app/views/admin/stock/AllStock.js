import {
    IconButton,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    Snackbar,
    Alert,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
    StockAlert,
    StyledButton,
    MyAlert,
} from 'app/components'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

import HandleStock from './HandleStock'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockActions'

const AllStock = () => {
    const [uid, setUid] = useState(null)
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(getAllData())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteData(hospitalDa)).then(() => {
            handleDialogClose()
        })
        dispatch(getAllData())
    }

    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const bgSuccess = palette.success.main

    let {
        stockData = [],
        showAlert,
        alertType,
        alertText,
    } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    return (
        <ContainerTable>
            {/* <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Stock', path: '/addStock' },
                        { name: 'Table' },
                    ]}
                />
            </div> */}
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Stock
            </Button>

            {stockData.length == 0 || stockData == undefined ? (
                <h1>No stock data found..!!</h1>
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Stock Name
                                    </TableCell>
                                    <TableCell align="center">
                                        Description
                                    </TableCell>
                                    <TableCell>total value</TableCell>
                                    <TableCell>Individual Price</TableCell>

                                    <TableCell> Total Qty </TableCell>

                                    {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockData
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
                                                {subscriber.description}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price *
                                                      subscriber.totalQty
                                                    : 0}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price
                                                    : 0}
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                align="left"
                                                // colSpan={2}
                                            >
                                                {subscriber.totalQty ? (
                                                    subscriber.totalQty <
                                                    subscriber.minimumLimit ? (
                                                        <StockAlert
                                                            bgcolor={
                                                                bgSecondary
                                                            }
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    ) : (
                                                        <StockAlert
                                                            bgcolor={bgPrimary}
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    )
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgError}
                                                    >
                                                        out of stock
                                                    </StockAlert>
                                                )}
                                            </TableCell>

                                            <TableCell align="center">
                                                <StyledButton
                                                    // variant="contained"
                                                    sx={{ color: bgSuccess }}
                                                    onClick={() => {
                                                        dispatch(
                                                            setEditData(
                                                                subscriber
                                                            )
                                                        )
                                                        setShouldOpenEditorDialog(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    <Icon color="primary">
                                                        edit
                                                    </Icon>
                                                </StyledButton>
                                            </TableCell>
                                            <TableCell>
                                                <StyledButton
                                                    sx={{ color: bgError }}
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            subscriber._id
                                                        )
                                                    }
                                                >
                                                    <Icon>delete</Icon>
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
                            count={stockData.length}
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
                            <HandleStock
                                handleClose={handleDialogClose}
                                open={shouldOpenEditorDialog}
                                uid={uid}
                            />
                        )}
                        {shouldOpenConfirmationDialog && (
                            <ConfirmationDialog
                                open={shouldOpenConfirmationDialog}
                                onConfirmDialogClose={handleDialogClose}
                                onYesClick={handleConfirmationResponse}
                                text="Are you sure to delete?"
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
            )}
        </ContainerTable>
    )
}

export default AllStock

// // import {
// //     IconButton,
// //     TableHead,
// //     TableBody,
// //     TableRow,
// //     TableCell,
// //     Icon,
// //     TablePagination,
// // } from '@mui/material'
// // import React, { useEffect } from 'react'
// // import { Box, useTheme } from '@mui/system'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { Link } from 'react-router-dom'
// // import {
// //     Breadcrumb,
// //     SimpleCard,
// //     ContainerTable,
// //     StyledTable,
// //     StockAlert,
// // } from 'app/components'
// import { Link } from 'react-router-dom'
// import MUIDataTable from 'mui-datatables'
// import { Breadcrumb, FlexBox, Container, StyledButton } from 'app/components'
// import React, { useState, useEffect } from 'react'
// import {
//     Avatar,
//     Grow,
//     Icon,
//     IconButton,
//     TextField,
//     Button,
// } from '@mui/material'
// import { Box, useTheme } from '@mui/system'
// import { useDispatch, useSelector } from 'react-redux'
// import { H5, Small } from 'app/components/Typography'
// import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

// import {
//     getAllData,
//     setEditData,
//     deleteData,
// } from 'app/redux/actions/admin/StockActions'

// const AllStock = () => {

//     const [uid, setUid] = useState(null)
//     const [hospitalDa, setHospitalDa] = useState(null)
//     const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
//     const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
//         useState(false)

//     const handleDialogClose = () => {
//         setShouldOpenEditorDialog(false)
//         setShouldOpenConfirmationDialog(false)
//         dispatch(getHospitalsData())
//     }
//     const handleDeleteUser = (hospitalId) => {
//         setHospitalDa(hospitalId)
//         setShouldOpenConfirmationDialog(true)
//     }

//     const handleConfirmationResponse = () => {
//         dispatch(deleteHospital(hospitalDa)).then(() => {
//             handleDialogClose()
//         })
//         dispatch(getHospitalsData())
//     }

//     // styles for
//     const { palette } = useTheme()
//     const bgError = palette.error.main
//     const bgPrimary = palette.primary.main
//     const bgSecondary = palette.secondary.main

//     let { stockData = [] } = useSelector((state) => state.stockList)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllData())
//     }, [dispatch])

//    const columns = [
//        {
//            name: 'stock_name',
//            label: 'Stock Name',
//            options: {
//                filter: true,
//            },
//        },
//        {
//            name: 'description',
//            label: 'Description',
//            options: {
//                filter: true,
//            },
//        },
//        {
//         //    name: `{price? price * totalQty: 0}`,
//            name: 'price',
//            label: 'Total value',
//            options: {
//                filter: true,
//            },
//        },
//        {
//            name: 'contect',
//            label: 'Price per unit',
//            options: {
//                filter: true,
//            },
//        },
//        {
//            name: 'pincode',
//            label: 'Total Qty',
//            options: {
//                filter: true,
//            },
//        },
//    ]

//     return (
//         <ContainerTable>
//             <div className="breadcrumb">
//                 <Breadcrumb
//                     routeSegments={[
//                         { name: 'Add Stock', path: '/addStock' },
//                         { name: 'Table' },
//                     ]}
//                 />
//             </div>
//             {stockData.length == 0 || stockData == undefined ? (
//                 <h1>No stock data found..!!</h1>
//             ) : (
//                 <SimpleCard title="Stocks List">
//                     <Box width="100%" overflow="auto">
//                         <StyledTable>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell align="center">
//                                         Stock Name
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         Description
//                                     </TableCell>
//                                     <TableCell>total value</TableCell>
//                                     <TableCell>Individual Price</TableCell>

//                                     <TableCell> Total Qty </TableCell>

//                                     {/* <TableCell>Address</TableCell>
//                         <TableCell align="center">Pincode</TableCell> */}
//                                     <TableCell align="center">Edit</TableCell>
//                                     <TableCell>Delete</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {stockData
//                                     .slice(
//                                         page * rowsPerPage,
//                                         page * rowsPerPage + rowsPerPage
//                                     )
//                                     .map((subscriber, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell align="center">
//                                                 {subscriber.stock_name}
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {subscriber.description}
//                                             </TableCell>
//                                             <TableCell>
//                                                 ${' '}
//                                                 {subscriber.price
//                                                     ? subscriber.price *
//                                                       subscriber.totalQty
//                                                     : 0}
//                                             </TableCell>
//                                             <TableCell>
//                                                 ${' '}
//                                                 {subscriber.price
//                                                     ? subscriber.price
//                                                     : 0}
//                                             </TableCell>

//                                             <TableCell
//                                                 sx={{ px: 0 }}
//                                                 align="left"
//                                                 // colSpan={2}
//                                             >
//                                                 {subscriber.totalQty ? (
//                                                     subscriber.totalQty <
//                                                     subscriber.minimumLimit ? (
//                                                         <StockAlert
//                                                             bgcolor={
//                                                                 bgSecondary
//                                                             }
//                                                         >
//                                                             {
//                                                                 subscriber.totalQty
//                                                             }{' '}
//                                                             available
//                                                         </StockAlert>
//                                                     ) : (
//                                                         <StockAlert
//                                                             bgcolor={bgPrimary}
//                                                         >
//                                                             {
//                                                                 subscriber.totalQty
//                                                             }{' '}
//                                                             available
//                                                         </StockAlert>
//                                                     )
//                                                 ) : (
//                                                     <StockAlert
//                                                         bgcolor={bgError}
//                                                     >
//                                                         out of stock
//                                                     </StockAlert>
//                                                 )}
//                                             </TableCell>

//                                             <TableCell align="center">
//                                                 <Link
//                                                     to={`/addStock`}
//                                                     onClick={() =>
//                                                         dispatch(
//                                                             setEditData(
//                                                                 subscriber
//                                                             )
//                                                         )
//                                                     }
//                                                 >
//                                                     <IconButton>
//                                                         <Icon color="error">
//                                                             edit
//                                                         </Icon>
//                                                     </IconButton>
//                                                 </Link>
//                                             </TableCell>
//                                             <TableCell
//                                                 onClick={() => {
//                                                     {
//                                                         alert(
//                                                             'Are you sure you want to delete?'
//                                                         )
//                                                         dispatch(
//                                                             deleteData(
//                                                                 subscriber._id
//                                                             )
//                                                         )
//                                                     }
//                                                 }}
//                                             >
//                                                 <IconButton>
//                                                     <Icon color="error">
//                                                         close
//                                                     </Icon>
//                                                 </IconButton>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </StyledTable>

//                         <TablePagination
//                             sx={{ px: 2 }}
//                             rowsPerPageOptions={[5, 10, 25]}
//                             component="div"
//                             count={stockData.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             backIconButtonProps={{
//                                 'aria-label': 'Previous Page',
//                             }}
//                             nextIconButtonProps={{
//                                 'aria-label': 'Next Page',
//                             }}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </Box>
//                 </SimpleCard>
//             )}
//         </ContainerTable>
//     )
// }

// export default AllStock
