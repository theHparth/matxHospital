import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
// import { getAllVendor } from 'app/redux/actions/VendorActions'

import { Button, Icon, Grid, Snackbar, Alert } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { inStockMinimumChange } from 'app/redux/actions/user/StockInUserAction'

import { Container, TextField } from '../../components/MyComponents/form/index'
import { useNavigate } from 'react-router-dom'

const EditMinimum = () => {
    let {
        isEditing,
        _id,
        minimumLimit,
        stock_name,
        isLoading,
        showAlert,
        alertText,
    } = useSelector((state) => state.stockInUserList)
    //    const dispatch = useDispatch()

    const [state, setState] = useState({
        id: _id,

        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })
    const clear = () => {
        setState({
            id: '',

            minimumLimit: '',
            stock_name: '',
        })
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        // e.preventDefault()

        dispatch(inStockMinimumChange(state))
        alertText === 'Minimum limit updated successfully' && clear()
        setTimeout(() => {
            window.location.reload(true)
        }, 1500)
        // window.location.reload(true)
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
        <Container>
            <SimpleCard>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>

                            <TextField
                                type="text"
                                name="stock_name"
                                id="standard-basic"
                                value={state.stock_name}
                                validators={['required']}
                                label="Stock Name"
                            />

                            <TextField
                                type="text"
                                name="minimumLimit"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.minimumLimit}
                                validators={['required']}
                                label="Minimum limit to show warning"
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
            </SimpleCard>
            {showAlert ? (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showAlert}
                    autoHideDuration={19000}
                >
                    <Alert
                        severity={
                            alertText === 'Minimum limit updated successfully'
                                ? 'success'
                                : 'error'
                        }
                        sx={{ width: '100%' }}
                    >
                        {alertText}
                    </Alert>
                </Snackbar>
            ) : null}
        </Container>
    )
}

export default EditMinimum
