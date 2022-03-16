import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    editHospital,
    addHospital,
    handleHospitalChange,
    clearValues,
    clearAlert,
    displayAlert,
} from 'app/redux/actions/HospitalActions'
import Alert from '../../components/Alert'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleForm = (props) => {
    const {
        isLoading,
        isEditing,
        showAlert,
        address,
        contect,
        email,
        pincode,
        password,
        username,
        _id,
    } = useSelector((x) => x.hospitalList)
    const [state, setState] = useState({
        id: _id,
        username: '',
        contect: contect,
        pincode: pincode,
        address: address,
        password: '',
        email: email,
    })
    const clear = () => {
        setState({
            username: '',
            contect: '',
            pincode: '',
            address: '',
            password: '',
            email: '',
            id: '',
        })
    }
    const dispatch = useDispatch()
    // console.log(isEditing)
    const handleSubmit = (e) => {
        e.preventDefault()

        if (_id) {
            dispatch(editHospital(state))
            dispatch(clearValues())
        } else {
            dispatch(addHospital(state))
            clear()
        }
    }

    // const handleHospitalInput = (event) => {
    //     event.persist()
    //     console.log(event.target.value)
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value,
    //     })
    // }
    const handleHospitalInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(name, value)
        setState({
            ...state,
            [name]: value,
        })
        console.log(state)
        // dispatch(handleHospitalChange({ name, value }))
    }
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <h3>{_id ? 'Edit Hospital' : 'Add Hospital'}</h3>
                        {showAlert && <Alert />}
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            onChange={handleHospitalInput}
                            value={state.username}
                            validators={['required']}
                            label="Username"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="address"
                            id="standard-basic"
                            onChange={handleHospitalInput}
                            value={state.address}
                            validators={['required']}
                            label="Address"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="pincode"
                            id="standard-basic"
                            onChange={handleHospitalInput}
                            value={state.pincode}
                            validators={['required']}
                            label="Pincode"
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            label="Email"
                            onChange={handleHospitalInput}
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
                            onChange={handleHospitalInput}
                            type="text"
                            name="contect"
                            value={state.contect}
                            validators={[
                                'required',
                                'minStringLength: 10',
                                'maxStringLength: 12',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Password"
                            onChange={handleHospitalInput}
                            name="password"
                            type="password"
                            value={state.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        {/* <TextField
                            label="Confirm Password"
                            onChange={handleHospitalInput}
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword || ''}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={[
                                'this field is required',
                                "password didn't match",
                            ]}
                        /> */}
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ margin: '5px' }}
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

// const [
//     isLoading,
//     isEditing,
//     showAlert,
//     address,
//     contect,
//     email,
//     pincode,
//     password,
//     username,
// ] = useSelector(
//     (x) => [
//         x.isLoading,
//         x.isEditing,
//         x.showAlert,
//         x.username,
//         x.address,
//         x.contect,
//         x.email,
//         x.pincode,
//         x.password,
//     ],
//     shallowEqual
// )
