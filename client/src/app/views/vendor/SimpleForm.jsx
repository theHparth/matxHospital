import { Button, Icon, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch, useSelector } from 'react-redux'
import { edit, add } from 'app/redux/actions/VendorActions'
import Alert from '../../components/Alert'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleForm = (props) => {
    const {
        showAlert,
        alertType,
        alertText,
        isLoading,
        address,
        contect,
        email,
        pincode,
        fname,
        _id,
    } = useSelector((x) => x.vendorList)

    const [state, setState] = useState({
        id: _id,

        contect: contect,
        pincode: pincode,
        address: address,
        fname: fname,
        email: email,
    })
    const clear = () => {
        setState({
            fname: '',
            contect: '',
            pincode: '',
            address: '',
            email: '',
            id: '',
        })
    }
    const dispatch = useDispatch()
    // console.log(isEditing)
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

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <h3>{_id ? 'Edit Vendor' : 'Add Vendor'}</h3>
                        {showAlert && (
                            <div className={`alert alert-${alertType}`}>
                                {alertText}
                            </div>
                        )}
                        <TextField
                            type="text"
                            name="fname"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.fname}
                            validators={['required']}
                            label="Vendor Name"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="address"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.address}
                            validators={['required']}
                            label="Address"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="pincode"
                            id="standard-basic"
                            onChange={handleInput}
                            value={state.pincode}
                            validators={['required']}
                            label="Pincode"
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            label="Email"
                            onChange={handleInput}
                            type="email"
                            name="email"
                            value={state.email}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />

                        <TextField
                            label="Mobile Nubmer"
                            onChange={handleInput}
                            type="text"
                            name="contect"
                            value={state.contect}
                            validators={['required']}
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
