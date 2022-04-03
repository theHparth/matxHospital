import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    SimpleCard,
    ContainerTable,
    StyledTable,
    StockAlert,
    StyledButton,
    MyAlert,
} from 'app/components'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

import { useLocation } from 'react-router-dom'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockActions'

const AllStock = () => {
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

    const filterStockData = stockData.filter((data) => {
        console.log(data.minimumLimit, '>=', data.totalQty)
        return data.minimumLimit >= data.totalQty
    })

    return (
        <ContainerTable>
            {filterStockData.length == 0 || filterStockData == undefined ? (
                <h1>Safe Zone..!!</h1>
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Stock Name</TableCell>

                                    <TableCell> Total Qty </TableCell>

                                    {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterStockData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {subscriber.stock_name}
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={0}
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
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filterStockData.length}
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

/////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import { Paragraph } from 'app/components/Typography'
// import { Box, styled, useTheme } from '@mui/system'
// import {
//     Card,
//     Icon,
//     IconButton,
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Avatar,
//     MenuItem,
//     Select,
// } from '@mui/material'

// const CardHeader = styled('div')(() => ({
//     paddingLeft: '24px',
//     paddingRight: '24px',
//     marginBottom: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
// }))

// const Title = styled('span')(() => ({
//     fontSize: '1rem',
//     fontWeight: '500',
//     textTransform: 'capitalize',
// }))

// const ProductTable = styled(Table)(() => ({
//     minWidth: 400,
//     whiteSpace: 'pre',
//     '& small': {
//         height: 15,
//         width: 50,
//         borderRadius: 500,
//         boxShadow:
//             '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
//     },
//     '& td': {
//         borderBottom: 'none',
//     },
//     '& td:first-of-type': {
//         paddingLeft: '16px !important',
//     },
// }))

// const Small = styled('small')(({ bgcolor }) => ({
//     height: 15,
//     width: 50,
//     color: '#fff',
//     padding: '2px 8px',
//     borderRadius: '4px',
//     overflow: 'hidden',
//     background: bgcolor,
//     boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
// }))

// const TopSellingTable = () => {
//     const { palette } = useTheme()
//     const bgError = palette.error.main
//     const bgPrimary = palette.primary.main
//     const bgSecondary = palette.secondary.main

//     return (
//         <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
//             <CardHeader>
//                 <Title>top selling products</Title>
//                 <Select size="small" defaultValue="this_month">
//                     <MenuItem value="this_month">This Month</MenuItem>
//                     <MenuItem value="last_month">Last Month</MenuItem>
//                 </Select>
//             </CardHeader>
//             <Box overflow="auto">
//                 <ProductTable>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ px: 3 }} colSpan={4}>
//                                 Name
//                             </TableCell>
//                             <TableCell sx={{ px: 0 }} colSpan={2}>
//                                 Revenue
//                             </TableCell>
//                             <TableCell sx={{ px: 0 }} colSpan={2}>
//                                 Stock Status
//                             </TableCell>
//                             <TableCell sx={{ px: 0 }} colSpan={1}>
//                                 Action
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {productList.map((product, index) => (
//                             <TableRow key={index} hover>
//                                 <TableCell
//                                     colSpan={4}
//                                     align="left"
//                                     sx={{ px: 0, textTransform: 'capitalize' }}
//                                 >
//                                     <Box display="flex" alignItems="center">
//                                         <Avatar src={product.imgUrl} />
//                                         <Paragraph sx={{ m: 0, ml: 4 }}>
//                                             {product.name}
//                                         </Paragraph>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell
//                                     align="left"
//                                     colSpan={2}
//                                     sx={{ px: 0, textTransform: 'capitalize' }}
//                                 >
//                                     $
//                                     {product.price > 999
//                                         ? (product.price / 1000).toFixed(1) +
//                                         'k'
//                                         : product.price}
//                                 </TableCell>

//                                 <TableCell
//                                     sx={{ px: 0 }}
//                                     align="left"
//                                     colSpan={2}
//                                 >
//                                     {product.available ? (
//                                         product.available < 20 ? (
//                                             <Small bgcolor={bgSecondary}>
//                                                 {product.available} available
//                                             </Small>
//                                         ) : (
//                                             <Small bgcolor={bgPrimary}>
//                                                 in stock
//                                             </Small>
//                                         )
//                                     ) : (
//                                         <Small bgcolor={bgError}>
//                                             out of stock
//                                         </Small>
//                                     )}
//                                 </TableCell>
//                                 <TableCell sx={{ px: 0 }} colSpan={1}>
//                                     <IconButton>
//                                         <Icon color="primary">edit</Icon>
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </ProductTable>
//             </Box>
//         </Card>
//     )
// }

// const productList = [
//     {
//         imgUrl: '/assets/images/products/headphone-2.jpg',
//         name: 'earphone',
//         price: 100,
//         available: 15,
//     },
//     {
//         imgUrl: '/assets/images/products/headphone-3.jpg',
//         name: 'earphone',
//         price: 1500,
//         available: 30,
//     },
//     {
//         imgUrl: '/assets/images/products/iphone-2.jpg',
//         name: 'iPhone x',
//         price: 1900,
//         available: 35,
//     },
//     {
//         imgUrl: '/assets/images/products/iphone-1.jpg',
//         name: 'iPhone x',
//         price: 100,
//         available: 0,
//     },
//     {
//         imgUrl: '/assets/images/products/headphone-3.jpg',
//         name: 'Head phone',
//         price: 1190,
//         available: 5,
//     },
// ]

// export default TopSellingTable
