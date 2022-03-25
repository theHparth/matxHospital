import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useNavigate } from 'react-router-dom'

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
import RadioGroup from '@mui/material/RadioGroup'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'

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
        priceType: 'individualPrice',
        vendor_name: vendor_name || '',
        // stockTotoalPrice: stockTotoalPrice || '',
        price: price || '',
        qty: qty || '',
        box: box || '',
        stock_name: stock_name || '',
    })
    const navigate = useNavigate()
    console.log(state)
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

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setState({
            ...state,
            [name]: value,
            // price:
            //     state.priceType === 'individualPrice'
            //         ? value * state.box * state.qty
            //         : value,
            // price: state.priceType === "individualPrice" ? value*state.box : value ,
            // stockTotoalPrice: name === "stockTotoalPrice" ? value : ""
        })

        console.log(state)
    }
    // const handleInputOptionStock = (e) => {
    //     var value = e.target.value
    //     setState({
    //         ...state,
    //         ['stock_name']: value,
    //     })
    // }

    // const [value, setValue] = React.useState({})
    // function handleChange(event) {
    //     setValue(event.target.value)
    // }
    return (
        <Container>
            {/* <Directionss
                description={'Werehouse Stock Details'}
                pathName={'/wereHouseStock'}
                type={'Table'}
            /> */}
            <div>
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
                                    sx={{ mt: 0 }}
                                >
                                    <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>
                                    {showAlert && (
                                        <div
                                            className={`alert alert-${alertType}`}
                                        >
                                            {alertText}
                                        </div>
                                    )}

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            mx: 3,
                                            my: 2,
                                            minWidth: 120,
                                            width: 200,
                                            height: 50,
                                        }}
                                    >
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Vendor Name
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={state.vendor_name}
                                            onChange={handleChange}
                                            label="Age"
                                            name="vendor_name"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Object.values(vendorData).map(
                                                (vender) => (
                                                    <MenuItem
                                                        value={
                                                            vender.vendor_name
                                                        }
                                                    >
                                                        {vender.vendor_name}
                                                    </MenuItem>
                                                )
                                            )}
                                            <MenuItem
                                                onClick={() =>
                                                    navigate('/addVendor')
                                                }
                                            >
                                                Add new vendor
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            mx: 3,
                                            my: 2,
                                            minWidth: 120,
                                            width: 200,
                                            height: 50,
                                        }}
                                    >
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Stock Name
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={state.stock_name}
                                            onChange={handleChange}
                                            label="Age"
                                            name="stock_name"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Object.values(stockData).map(
                                                (stock) => (
                                                    <MenuItem
                                                        value={stock.stock_name}
                                                    >
                                                        {stock.stock_name}
                                                    </MenuItem>
                                                )
                                            )}
                                            <MenuItem
                                                onClick={() =>
                                                    navigate('/addStock')
                                                }
                                            >
                                                Add new stock
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Total Box."
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        type="number"
                                        name="qty"
                                        value={state.qty}
                                        validators={['required', 'minNumber:1']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />

                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">
                                            Select Price Type
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={'individualPrice'}
                                            name="priceType"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="individualPrice"
                                                control={<Radio />}
                                                label="Individual Price"
                                            />
                                            <FormControlLabel
                                                value="totalPrice"
                                                control={<Radio />}
                                                label="Total Price"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    {/* {state.priceType === 'individualPrice' ? ( */}
                                    <TextField
                                        label="Add price here"
                                        onChange={handleChange}
                                        type="number"
                                        name="price"
                                        value={state.price}
                                        validators={['required', 'minNumber:1']}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                    {/* ) : ( */}
                                    {/* <TextField
                                            label="Add price here"
                                            onChange={handleChange}
                                            type="number"
                                            name='stockTotoalPrice'
                                            value={state.stockTotoalPrice}
                                            validators={[
                                                'required',
                                                'minNumber:1',
                                            ]}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        /> */}
                                    {/* )} */}
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
