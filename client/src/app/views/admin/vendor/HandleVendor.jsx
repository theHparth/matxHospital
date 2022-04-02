import { generateRandomId } from 'app/utils/utils'
import React, { useState, useEffect } from 'react'
// import { getUserById, updateUser, addNewUser } from './TableService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Dialog,
    Button,
    Grid,
    FormControlLabel,
    Switch,
    Snackbar,
    Alert,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { useDispatch, useSelector } from 'react-redux'

// import {
//     getHospitalsData,
//     editHospital,
//     addHospital,
//     clearValue,
// } from 'app/redux/actions/admin/HospitalActions'
import { edit, add, clearValue } from 'app/redux/actions/admin/VendorActions'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({ uid, open, handleClose }) => {
    const {
        clearValues,
        isLoading,
        isEditing,
        showAlert,
        alertType,
        alertText,
        address,
        contect,
        email,
        pincode,
        vendor_name,
        _id,
    } = useSelector((x) => x.vendorList)

    const [state, setState] = useState({
        id: _id,

        contect: contect,
        pincode: pincode,
        address: address,
        vendor_name: vendor_name,
        email: email,
    })
    const clear = () => {
        setState({
            vendor_name: '',
            contect: '',
            pincode: '',
            address: '',
            email: '',
            id: '',
        })
    }
    const dispatch = useDispatch()

    const cancleWithClean = () => {
        dispatch(clearValue())
        clear()
        handleClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEditing) {
            dispatch(edit(state))
            if (!clearValues) {
                dispatch(clearValue())
                clear()
                handleClose()
            }
        } else {
            dispatch(add(state))
            if (!clearValues) {
                clear()
                handleClose()
            }
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

    // const handleChange = (event, source) => {
    //     event.persist()
    //     if (source === 'switch') {
    //         setState({
    //             ...state,
    //             isActive: event.target.checked,
    //         })
    //         return
    //     }

    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value,
    //     })
    // }

    // const handleFormSubmit = () => {
    //     let { id } = state
    //     if (id) {
    //         updateUser({
    //             ...state,
    //         }).then(() => {
    //             handleClose()
    //         })
    //     } else {
    //         addNewUser({
    //             id: generateRandomId(),
    //             ...state,
    //         }).then(() => {
    //             handleClose()
    //         })
    //     }
    // }

    // useEffect(() => {
    //     getUserById(uid).then((data) => setState({ ...data.data }))
    // }, [uid])
    // useEffect(() => {
    //     dispatch(getHospitalsData())
    // }, [dispatch])

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                {isEditing ? (
                    <H4 sx={{ mb: '20px' }}>Update Vendor Info</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>Add New Vendor</H4>
                )}
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="vendor_name"
                                id="standard-basic"
                                onChange={handleHospitalInput}
                                value={state.vendor_name}
                                validators={['required']}
                                label="Vendor Name"
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
                        </Grid>

                        <Grid item sm={16} xs={12}>
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
                        </Grid>
                    </Grid>

                    <FormHandlerBox>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={cancleWithClean}
                        >
                            Cancel
                        </Button>
                    </FormHandlerBox>
                </ValidatorForm>
            </Box>
            {showAlert ? (
                <Snackbar open={showAlert} autoHideDuration={3000}>
                    <Alert
                        severity={
                            alertText === 'Vendor data Updated!' ||
                            alertText === 'New Vendor data Added!'
                                ? 'success'
                                : 'error'
                        }
                        sx={{ width: '100%' }}
                    >
                        {alertText}
                    </Alert>
                </Snackbar>
            ) : null}
        </Dialog>
    )
}

export default MemberEditorDialog
