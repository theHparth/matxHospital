import {
    Icon,
    Button,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from '@mui/material'
import { format } from 'date-fns'
import { Box, styled } from '@mui/system'
// import { getInvoiceById } from './InvoiceService'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { H5, Paragraph } from 'app/components/Typography'
import {
    StyledTable,
    StyledH5,
    TextBox,
    ButtonBox,
    FlexBox,
} from './StyleInvoice'
import { useDispatch, useSelector } from 'react-redux'
import { getHospitalsData } from 'app/redux/actions/admin/HospitalActions'
import moment from 'moment'
// import json

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
    const {
        showAlert,
        clearValues,
        isLoading,
        isEditing,
        _id,
        hospitalName,
        invoiceNum,
        stockOutDetail,
        createdFor,
        createdAt,
        alertText,
        latestStatus,
    } = useSelector((x) => x.stockOutList)

    const user = localStorage.getItem('user')
    const { Iaddress, Icontect, Iemail, Ipincode } = useSelector(
        (stat) => stat.hospitalList
    )

    const state = {}

    console.log('hospital Data', Iaddress, Icontect, Iemail, Ipincode)
    var adminInfo = JSON.parse(user)
    var userAdd =
        adminInfo['address'] +
        ' - ' +
        adminInfo['pincode'] +
        '\nContect: ' +
        adminInfo['contect'] +
        '\nEmail: ' +
        adminInfo['email']

    var hospitalAdd =
        Iaddress +
        ' - ' +
        Ipincode +
        '\nContect: ' +
        Icontect +
        '\nEmail: ' +
        Iemail

    console.log(
        'stock out detail',
        _id,
        hospitalName,
        invoiceNum,
        stockOutDetail,
        createdFor,
        createdAt,
        alertText
    )

    const handlePrint = () => window.print()

    let subTotalCost = 0
    let {
        orderNo,
        buyer,
        seller,
        item: invoiceItemList = [],
        status,
        vat,
        date,
    } = state

    return (
        <Box py={2} className="invoice-viewer">
            <ButtonBox className="viewer_actions">
                <Link to="/invoice/list">
                    <IconButton>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                </Link>
                <div>
                    {/* <Button
                        sx={{ mr: 2, py: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => toggleInvoiceEditor()}
                    >
                        Edit Invoice
                    </Button> */}
                    <Button
                        sx={{ py: 1 }}
                        onClick={handlePrint}
                        variant="contained"
                        color="secondary"
                    >
                        Print Invoice
                    </Button>
                </div>
            </ButtonBox>

            <div id="print-area">
                <FlexBox px={2} mb={2} className="viewer__order-info">
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Order Info</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>Order Number</Paragraph>
                        <Paragraph># {invoiceNum}</Paragraph>
                    </div>
                    <TextBox>
                        <StyledH5 sx={{ mb: 1 }}>
                            <strong>Order status: </strong>
                            <span>
                                {latestStatus == true ? 'Delivered' : 'Pending'}
                            </span>
                        </StyledH5>
                        <StyledH5>
                            <strong>Order date: </strong>
                            <span>
                                {moment(createdAt).format('MMM Do, YYYY')}
                            </span>
                        </StyledH5>
                    </TextBox>
                </FlexBox>

                <Divider />

                <FlexBox
                    px={2}
                    py="20px"
                    mb={2}
                    className="viewer__billing-info"
                >
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Bill From</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>
                            {adminInfo['name']}
                        </Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {userAdd}
                        </Paragraph>
                    </div>
                    <Box width="100%" textAlign="right">
                        <StyledH5 sx={{ mb: 1 }}>Bill To</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>{hospitalName}</Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {hospitalAdd}
                        </Paragraph>
                    </Box>
                    <div />
                </FlexBox>

                <StyledTable sx={{ mb: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Units</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockOutDetail.map((item, index) => {
                            {
                                item.priceForUser &&
                                    (subTotalCost +=
                                        item.totalBox *
                                        item.totalQtyInOneBox *
                                        item.priceForUser)
                            }
                            return (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.stock_name}
                                    </TableCell>
                                    <TableCell>
                                        {item.totalBox * item.totalQtyInOneBox}
                                    </TableCell>
                                    <TableCell>{item.priceForUser}</TableCell>
                                    <TableCell>
                                        {item.priceForUser &&
                                            item.totalBox *
                                                item.totalQtyInOneBox *
                                                item.priceForUser}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </StyledTable>

                <FlexBox px={2} sx={{ justifyContent: 'flex-end' }}>
                    <Box display="flex">
                        <Box pr={6}>
                            <Paragraph sx={{ my: 2 }}>Sub Total:</Paragraph>
                            {/* <Paragraph sx={{ mb: 2 }}>Vat(%):</Paragraph>
                            <strong>
                                <p>Grand Total:</p>
                            </strong> */}
                        </Box>
                        <div>
                            <Paragraph sx={{ my: 2 }}>{subTotalCost}</Paragraph>
                            {/* <Paragraph sx={{ mb: 2 }}>{vat}</Paragraph>
                            <p>
                                <strong>
                                    $
                                    {
                                        (subTotalCost +=
                                            (subTotalCost * vat) / 100)
                                    }
                                </strong>
                            </p> */}
                        </div>
                    </Box>
                </FlexBox>
            </div>
        </Box>
    )
}

export default InvoiceViewer
