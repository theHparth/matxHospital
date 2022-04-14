import React, { Fragment } from 'react'
import TopSellingTable from './TopSellingTable'
import { Grid } from '@mui/material'

const InventoryDashboard = () => {
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <TopSellingTable />
                    {/* <Card sx={{ px: 3, py: 2 }}> */}
                    {/*     <Grid container spacing={3} alignItems="center">
                            <Grid item sm={7} xs={12}>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5
                                        sx={{
                                            fontWeight: '500',
                                            color: textError,
                                        }}
                                    >
                                        Stockout Items
                                    </H5>
                                    <H5 sx={{ color: textError }}>234</H5>
                                </FlexBox>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5 sx={{ fontWeight: '500' }}>
                                        Low Stock Items
                                    </H5>
                                    <h5>123</h5>
                                </FlexBox>
                                <FlexBox sx={{ py: '12px' }}>
                                    <H5 sx={{ fontWeight: '500' }}>
                                        Available Items
                                    </H5>
                                    <h5>3432</h5>
                                </FlexBox>
                            </Grid>
                            <Grid item sm={5} xs={12}>
                                <InventoryDoughnutChart />
                            </Grid>
                        </Grid> */}

                    {/* <Divider sx={{ mt: 3 }} /> */}

                    {/* <FlexBox sx={{ p: 2 }}>
                            <H5 sx={{ m: 0 }}>Purchase Order</H5>
                            <Select
                                size="small"
                                defaultValue="this_year"
                            >
                                <MenuItem value="this_year">This Year</MenuItem>
                                <MenuItem value="last_year">Last Year</MenuItem>
                            </Select>
                        </FlexBox> */}

                    {/* <Box display="flex" justifyContent="space-around">
                                <Box py="12px" textAlign="center">
                                    <p>Quantity Ordered</p>
                                    <H4 sx={{ color: textPrimary }}>432</H4>
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                <Box py="12px" textAlign="center">
                                    <p>Total Cost</p>
                                    <H4 sx={{ color: textPrimary }}>
                                        ${(432432).toLocaleString()}
                                    </H4>
                                </Box>
                            </Box> */}
                    {/* </Card> */}
                </Grid>

                {/* <Grid item sm={6} xs={12}></Grid> */}
            </Grid>

            {/* <Card sx={{ mt: '20px', mb: 3 }} elevation={3}>
                <FlexBox sx={{ p: 2 }}>
                    <H4>Sales Order Summery</H4>
                    <Select
                        size="small"
                        defaultValue="this_year"
                    >
                        <MenuItem value="this_year">This Year</MenuItem>
                        <MenuItem value="last_year">Last Year</MenuItem>
                    </Select>
                </FlexBox>
                <InventoryLineChart />
            </Card> */}
        </Fragment>
    )
}

export default InventoryDashboard
