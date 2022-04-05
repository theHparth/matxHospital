import { Card, Dialog } from '@mui/material'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import InvoiceAutoGenerate from './AutoGenerateInvoice'

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InvoiceDetails = ({ invoiceInfo, handleClose, open }) => {
    console.log('invoiceInfo', invoiceInfo)
    return (
        <Dialog onClose={handleClose} open={open}>
            <StyledCard elevation={16}>
                <InvoiceAutoGenerate invoiceInfo={invoiceInfo} />
            </StyledCard>
        </Dialog>
    )
}

export default InvoiceDetails
