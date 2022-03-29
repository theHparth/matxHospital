import React, { Fragment } from 'react'
import GridProductCard from './GridProductCard'
import ListProductCard from './ListProductCard'
import * as _ from 'lodash'
import {
    Grid,
    TextField,
    Icon,
    Button,
    MenuItem,
    IconButton,
    TablePagination,
    Hidden,
} from '@mui/material'
import { Box, styled } from '@mui/system'

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const ContentBox = styled(FlexBox)(({ theme }) => ({
    flexGrow: 1,
    justifyContent: 'flex-end',
}))

const ShopContainer = ({
    orderBy,
    view,
    productList,
    page,
    rowsPerPage,
    toggleSidenav,
    toggleView,
    handleChange,
    handleChangePage,
    setRowsPerPage,
}) => {
    return (
        <Fragment>
            <Box width="100%" height="100%" position="relative">
                <FlexBox sx={{ mb: 2 }}>
                    <Hidden mdUp>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={toggleSidenav}
                        >
                            Filter
                        </Button>
                    </Hidden>
                    <ContentBox>
                        <TextField
                            select
                            name="orderBy"
                            variant="standard"
                            onChange={handleChange}
                            value={orderBy}
                        >
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="asc">Lowest Price</MenuItem>
                            <MenuItem value="desc">Highest Price</MenuItem>
                        </TextField>
                        <IconButton
                            size="large"
                            onClick={() => toggleView('grid')}
                        >
                            <Icon
                                color={view === 'grid' ? 'primary' : 'inherit'}
                            >
                                view_comfy
                            </Icon>
                        </IconButton>
                        <IconButton
                            size="large"
                            onClick={() => toggleView('list')}
                        >
                            <Icon
                                color={view === 'list' ? 'primary' : 'inherit'}
                            >
                                list
                            </Icon>
                        </IconButton>
                    </ContentBox>
                </FlexBox>
                <Grid container spacing={2}>
                    {_.orderBy(
                        productList,
                        orderBy !== 'false' ? 'price' : '',
                        orderBy
                    )
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((product) =>
                            view === 'grid' ? (
                                <Grid
                                    item
                                    key={product.id}
                                    lg={4}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <GridProductCard
                                        product={product}
                                    ></GridProductCard>
                                </Grid>
                            ) : (
                                <Grid
                                    item
                                    key={product.id}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <ListProductCard
                                        product={product}
                                    ></ListProductCard>
                                </Grid>
                            )
                        )}
                </Grid>
            </Box>
            <TablePagination
                rowsPerPageOptions={[6, 12, 24]}
                component="div"
                count={productList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={setRowsPerPage}
            />
        </Fragment>
    )
}

export default ShopContainer
