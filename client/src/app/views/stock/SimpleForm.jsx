import { Button, Icon, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Manu from './Menu'

import { useDispatch, useSelector } from 'react-redux'
import { edit, add } from 'app/redux/actions/StockActions'
import Alert from '../../components/Alert'
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
        _id,
    } = useSelector((x) => x.stockList)

    const [state, setState] = useState({
        id: vendor_id,

        description: description,
        vendor_name: vendor_name,
        vendor_id: vendor_id,
        price: price,
        qty: qty,
    })
    const clear = () => {
        setState({
            description: '',
            vendor_name: '',
            vendor_id: '',
            price: 0,
            qty: 0,
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
    const vendorInfo = {}
    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])
    vendorData.map((x) => (vendorInfo[x._id] = x.fname))

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        var valuess = Object.values(vendorData).filter(function (item) {
            if (item._id == e.target.value) {
                return item
            }
        })
        console.log(valuess[0].fname)
        setState({
            ...state,
            vendor_name: valuess[0].fname,
            [name]: value,
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
                        Select Vendor
                        {/* <TextField> */}
                        <select onChange={handleInput}>
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
                            label="Total Qty."
                            onChange={handleInput}
                            type="number"
                            name="qty"
                            value={state.qty}
                            validators={['required']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
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
