import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch, useSelector } from 'react-redux'
import { editHospital, addHospital } from 'app/redux/actions/HospitalActions'
import Alert from '../../components/Alert'

import { Container, TextField } from '../../components/MyComponents/form/index'

const AddHospital = () => {
    const {
        showAlert,
        isLoading,
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
            clear()
        } else {
            dispatch(addHospital(state))
            clear()
        }
    }

    const handleHospitalInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'All Hospital', path: '/allHospitals' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            <SimpleCard>
                <div>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h3>
                                    {_id ? 'Edit Hospital' : 'Add Hospital'}
                                </h3>
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
                                    validators={['required']}
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
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AddHospital
