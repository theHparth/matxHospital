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
import { DatePicker } from '@mui/lab'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    editHospital,
    addHospital,
    handleHospitalChange,
    clearValues,
    clearAlert,
    displayAlert,
} from 'app/redux/actions/HospitalActions'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleForm = () => {
    const [state, setState] = useState()
    const [isLoading, isEditing, showAlert, address, contect, email, pincode] =
        useSelector(
            (x) => [
                x.isLoading,
                x.isEditing,
                x.showAlert,
                x.address,
                x.contect,
                x.email,
                x.pincode,
            ],
            shallowEqual
        )
    const dispatch = useDispatch()

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!address || !pincode || !contect || !email) {
            displayAlert()
            return
        }
        if (isEditing) {
            editHospital(state)
            return
        }
        addHospital(state)
    }

    const handleHospitalInput = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    // const { username, address, contect, password, confirmPassword, email } =
    //     state

    /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        {/* <h3>{isEditing ? 'edit Hospital' : 'add Hospital'}</h3>
                        {showAlert && <Alert />} */}
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            onChange={handleHospitalInput}
                            value={username || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 9',
                            ]}
                            label="Username (Min length 4, Max length 9)"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="text"
                            name="address"
                            id="standard-basic"
                            onChange={handleHospitalInput}
                            value={address || ''}
                            validators={['required']}
                            label="Address"
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            label="Email"
                            onChange={handleHospitalInput}
                            type="email"
                            name="email"
                            value={email || ''}
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
                            value={contect || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Password"
                            onChange={handleHospitalInput}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
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
                        />
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Submit
                    </Span>
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default SimpleForm
