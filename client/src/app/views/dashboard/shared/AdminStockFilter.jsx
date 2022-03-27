import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
} from '@mui/material'
import {
    CardHeader,
    Title,
    ProductTable,
    Small,
} from 'app/components/MyComponents/dashboard/Dashboard'

// for data perpos
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/StockActions'
import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Container,
    StyledTable,
    StockAlert,
} from '../../../components/MyComponents/table/index'

const TopSellingTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    let { stockData = [] } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value)
    //     setPage(0)
    // }
    const filterStockData = stockData.filter((data) => {
        console.log(data)
        return data.minimumLimit >= data.totalQty
    })

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>top selling products</Title>
                <Select size="small" defaultValue="this_month">
                    <MenuItem value="this_month">This Month</MenuItem>
                    <MenuItem value="last_month">Last Month</MenuItem>
                </Select>
            </CardHeader>
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={0}>
                                Stock Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={0}>
                                Totoal Qty.
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockData.map(
                            (subscriber, index) =>
                                subscriber.totalQty <
                                    subscriber.minimumLimit && (
                                    <TableRow key={index}>
                                        <TableCell sx={{ px: 3 }} colSpan={0}>
                                            {subscriber.stock_name}
                                        </TableCell>

                                        <TableCell sx={{ px: 0 }} colSpan={0}>
                                            {subscriber.totalQty ? (
                                                subscriber.totalQty <
                                                subscriber.minimumLimit ? (
                                                    <StockAlert
                                                        bgcolor={bgSecondary}
                                                    >
                                                        {subscriber.totalQty}{' '}
                                                        available
                                                    </StockAlert>
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgPrimary}
                                                    >
                                                        {subscriber.totalQty}{' '}
                                                        available
                                                    </StockAlert>
                                                )
                                            ) : (
                                                <StockAlert bgcolor={bgError}>
                                                    out of stock
                                                </StockAlert>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    )
}

const productList = [
    {
        name: 'Milk',
        price: 100,
        available: 15,
    },
    {
        name: 'Apple',
        price: 1500,
        available: 30,
    },
    {
        name: 'Banana',
        price: 1900,
        available: 35,
    },
    {
        name: 'Nuts',
        price: 100,
        available: 0,
    },
    {
        name: 'Egg',
        price: 1190,
        available: 5,
    },
]
export default TopSellingTable
