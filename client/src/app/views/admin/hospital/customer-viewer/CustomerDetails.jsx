import React from 'react'
import { Grid, Fade } from '@mui/material'
import CustomerBillings from './CustomerBillings'
import CustomerEmailSender from './CustomerEmailSender'
import CustomerInfo from './CustomerInfo'
import CustomerActions from './CustomerActions'

const CustomerDetails = ({ id }) => {
    return (
        <Fade in timeout={300}>
            <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                    <CustomerInfo id={id} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <CustomerBillings id={id} />
                </Grid>
                {/* <Grid item lg={4} md={6} xs={12}>
                    <CustomerEmailSender id={id} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <CustomerActions id={id} />
                </Grid> */}
            </Grid>
        </Fade>
    )
}

export default CustomerDetails
