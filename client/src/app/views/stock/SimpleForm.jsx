import { Button, Icon, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch, useSelector } from 'react-redux'
import { edit, add } from 'app/redux/actions/StockActions'

import { getAllData } from 'app/redux/actions/VendorActions'
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleForm = () => {
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

    const [state, setState] = useState({
        id: _id,
        description: description,
        vendor_name: vendor_name,
        vendor_id: vendor_id,
        price: price,
        qty: qty,
        box: box,
        stock_name: stock_name,
    })
    const clear = () => {
        setState({
            id: '',
            description: '',
            vendor_name: '',
            vendor_id: '',
            price: 1,
            qty: 1,
            box: 1,
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
    const { vendorData } = useSelector((state) => state.vendorList)
    useEffect(() => {
        dispatch(getAllData())
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
        Object.values(vendorData).filter(function (item) {
            if (item._id == e.target.value) {
                ffname.push(item.fname)
            }
        })

        setState({
            ...state,
            vendor_id: e.target.value,
            vendor_name: ffname[0],
        })
    }

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>
                        {showAlert && (
                            <div className={`alert alert-${alertType}`}>
                                {alertText}
                            </div>
                        )}
                        {/* Select Vendor */}
                        {/* <TextField> */}
                        <select onChange={handleInputOption}>
                            <option>Select Vendor</option>
                            {Object.values(vendorData).map((data, key) => (
                                <option
                                    key={key}
                                    name="vendor_id"
                                    value={data._id}
                                >
                                    {data.fname}
                                </option>
                            ))}
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
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="description"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.description}
                            validators={['required']}
                            label="Address"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="number"
                            name="price"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.price}
                            validators={['required']}
                            label="Price"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Total Box."
                            onChange={handleInput}
                            type="number"
                            name="box"
                            value={state.box}
                            validators={['required', 'minNumber:1']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Qty in one Box"
                            onChange={handleInput}
                            type="number"
                            name="qty"
                            value={state.qty}
                            validators={['required', 'minNumber:1']}
                            errorMessages={['this field is required']}
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
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
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
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Clear Value
                    </Span>
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default SimpleForm
