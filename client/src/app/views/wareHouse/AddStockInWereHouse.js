import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'

import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch, useSelector } from 'react-redux'
import { edit, add } from 'app/redux/actions/StockActions'

import { getAllData as vendorData } from 'app/redux/actions/VendorActions'
import { getAllData as stockDataList } from 'app/redux/actions/StockActions'
import { Container, TextField } from '../../components/MyComponents/form/index'

const AddStockInWereHouse = () => {
    const {
        showAlert,
        alertType,
        alertText,
        isLoading,
        description,
        vendor_name,
        vendor_id,
        price,
        qty,
        box,
        _id,
        stock_name,
    } = useSelector((x) => x.stockList)
    console.log(
        description,
        vendor_name,
        vendor_id,
        price,
        qty,
        box,
        stock_name,
        _id
    )

    const [state, setState] = useState({
        id: _id,
        description: description,
        vendor_name: vendor_name || 'Please Select a vendor name',
        vendor_id: vendor_id,
        price: price,
        qty: qty,
        box: box,
        stock_name: stock_name || 'Please Select a stock name',
    })
    const clear = () => {
        setState({
            id: '',
            description: '',
            vendor_name: 'Please Select a vendor name',
            price: 1,
            qty: 1,
            box: 1,
            stock_name: 'Please Select a stock',
        })
    }
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()

        if (_id) {
            dispatch(edit(state))
            clear()
        } else {
            dispatch(add(state))
            clear()
        }
    }
    // for getting vendor data
    const { wereHouseStockData } = useSelector(
        (state) => state.wereHouseStockList
    )
    const { stockData } = useSelector((state) => state.stockList)
    useEffect(() => {
        dispatch(vendorData())
        dispatch(stockDataList())
    }, [dispatch])

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleInputOption = (e) => {
        const ffname = []
        Object.values(wereHouseStockData).filter(function (item) {
            if (item._id == e.target.value) {
                // ffname.push(item.fname)
                setState({
                    ...state,
                    vendor_id: e.target.value,
                    vendor_name: item.fname,
                })
            }
        })

        // setState({
        //     ...state,
        //     vendor_id: e.target.value,
        //     vendor_name: ffname[0],
        // })
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Add Stock in WereHouse',
                            path: '/addStockInWereHouse',
                        },
                        { name: 'Form' },
                    ]}
                />
            </div>

            <SimpleCard title="Stocks List">
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                {
                                    name: 'Werehouse Stock Details',
                                    path: '/wereHouseStock',
                                },
                                { name: 'Table' },
                            ]}
                        />
                    </div>
                    <SimpleCard>
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={() => null}
                        >
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>
                                    {showAlert && (
                                        <div
                                            className={`alert alert-${alertType}`}
                                        >
                                            {alertText}
                                        </div>
                                    )}
                                    Select Vendor
                                    {/* <TextField> */}
                                    <select onChange={handleInputOption}>
                                        <option value={state.fname} selected>
                                            {state.fname}
                                        </option>
                                        {Object.values(wereHouseStockData).map(
                                            (data, key) => (
                                                <option
                                                    key={key}
                                                    name="vendor_id"
                                                    value={
                                                        state.vendor_id ||
                                                        data._id
                                                    }
                                                >
                                                    {state.vendor_name ||
                                                        data.fname}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <select onChange={handleInputOption}>
                                        <option
                                            value="state.stock_name"
                                            selected
                                        >
                                            {state.stock_name}
                                        </option>
                                        {Object.values(stockData).map(
                                            (data, key) => (
                                                <option
                                                    key={key}
                                                    name="stock_name"
                                                    value={data.stock_name}
                                                >
                                                    {data.stock_name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {/* </TextField> */}
                                    {/* <TextField
                            type="text"
                            name="vendor_name"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.vendor_name}
                            validators={['required']}
                            label="Vendor Name"
                            errorMessages={['this field is required']}
                        /> */}
                                    <TextField
                                        type="text"
                                        name="stock_name"
                                        id="standard-basic"
                                        onChange={handleInput}
                                        value={state.stock_name}
                                        validators={['required']}
                                        label="Stock Name"
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                    <TextField
                                        type="text"
                                        name="description"
                                        id="standard-basic"
                                        onChange={handleInput}
                                        value={state.description}
                                        validators={['required']}
                                        label="Description"
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                    <TextField
                                        type="number"
                                        name="price"
                                        id="standard-basic"
                                        onChange={handleInput}
                                        value={state.price}
                                        validators={['required']}
                                        label="Price"
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                    <TextField
                                        label="Total Box."
                                        onChange={handleInput}
                                        type="number"
                                        name="box"
                                        value={state.box}
                                        validators={['required', 'minNumber:1']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                    <TextField
                                        label="Qty in one Box"
                                        onChange={handleInput}
                                        type="number"
                                        name="qty"
                                        value={state.qty}
                                        validators={['required', 'minNumber:1']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{ margin: '5px' }}
                                disabled={isLoading}
                            >
                                <Icon>send</Icon>
                                <Span
                                    sx={{ pl: 1, textTransform: 'capitalize' }}
                                >
                                    Submit
                                </Span>
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{ margin: '5px' }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    clear()
                                }}
                            >
                                <Icon>clear</Icon>
                                <Span
                                    sx={{ pl: 1, textTransform: 'capitalize' }}
                                >
                                    Clear Value
                                </Span>
                            </Button>
                        </ValidatorForm>
                    </SimpleCard>
                    {/* <Box py="12px" /> */}
                </Container>
            </SimpleCard>
        </Container>
    )
}

export default AddStockInWereHouse
