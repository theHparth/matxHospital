import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'

import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { edit, add } from 'app/redux/actions/WareHouseAction'

import { getAllVendor } from 'app/redux/actions/VendorActions'
import { getAllData } from 'app/redux/actions/StockActions'
import {
    Container,
    TextField,
    RadioRoot,
} from '../../components/MyComponents/form/index'

import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { Link } from 'react-router-dom'

import { Directionss } from '../../components/MyComponents/Directionss'
const AddStockInWereHouse = () => {
    const {
        showAlert,
        alertType,
        alertText,
        isLoading,
        vendor_name,
        price,
        qty,
        box,
        _id,
        stock_name,
        stockTotoalPrice,
    } = useSelector((x) => x.wareHouseStockList)

    const [state, setState] = useState({
        id: _id,

        vendor_name: vendor_name || '',
        stockTotoalPrice: stockTotoalPrice || '',
        price: price || '',
        qty: qty || '',
        box: box || '',
        stock_name: stock_name || '',
    })
    const clear = () => {
        setState({
            id: '',

            vendor_name: '',
            qty: 1,
            box: 1,
            price: 1,
            stockTotoalPrice: 1,
            stock_name: '',
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

    const { stockData = [] } = useSelector((states) => states.stockList)
    const { vendorData = [] } = useSelector((states) => states.vendorList)

    useEffect(() => {
        dispatch(getAllVendor())
        dispatch(getAllData())
    }, [])

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleInputOptionVendor = (e) => {
        var value = e.target.value
        setState({
            ...state,
            ['vendor_name']: value,
        })
    }
    const handleInputOptionStock = (e) => {
        var value = e.target.value
        setState({
            ...state,
            ['stock_name']: value,
        })
    }

    const [value, setValue] = React.useState({})
    function handleChange(event) {
        setValue(event.target.value)
    }
    return (
        <Container>
            {/* <Directionss
                description={'Werehouse Stock Details'}
                pathName={'/wereHouseStock'}
                type={'Table'}
            /> */}
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
            <SimpleCard title="Stocks List">
                <Container>
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
                                    {/* Select Vendor */}
                                    {/* <TextField> */}
                                    <select onClick={handleInputOptionVendor}>
                                        <option
                                            name="vendor_name"
                                            value={state.vendor_name}
                                            defaultValue
                                        >
                                            {state.vendor_name}
                                        </option>
                                        {Object.values(vendorData).map(
                                            (data, key) => (
                                                <option
                                                    key={key}
                                                    name="vendor_name"
                                                    value={data.vendor_name}
                                                >
                                                    {data.vendor_name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {/* select stocks */}
                                    <select onClick={handleInputOptionStock}>
                                        <option
                                            value={state.stock_name}
                                            name="stock_name"
                                            defaultValue
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
                                        {/* <option onClick={push('/search')}>
                                            aaa
                                        </option> */}
                                    </select>
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
                                    <h1>
                                        arranging and change state is not
                                        completed call me for this
                                    </h1>
                                    <RadioRoot>
                                        <FormControl
                                            component="fieldset"
                                            className="formControl"
                                        >
                                            <FormLabel component="legend">
                                                Selece Price Type
                                            </FormLabel>
                                            <FormControlLabel
                                                name="price"
                                                control={<Radio />}
                                                label="Price of indivisulal Item"
                                            />
                                            <FormControlLabel
                                                name="stockTotoalPrice"
                                                control={<Radio />}
                                                label="Total price"
                                            />
                                        </FormControl>
                                    </RadioRoot>
                                    <TextField
                                        label="Add price here"
                                        onChange={handleInput}
                                        type="number"
                                        name="box"
                                        value={
                                            state.price ||
                                            state.stockTotoalPrice
                                        }
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
