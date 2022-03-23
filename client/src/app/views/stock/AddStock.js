import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
// import { getAllVendor } from 'app/redux/actions/VendorActions'

import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { edit, add } from 'app/redux/actions/StockActions'

import { Container, TextField } from '../../components/MyComponents/form/index'

const AddStock = () => {
    const {
        showAlert,
        alertType,
        alertText,
        isLoading,
        description,
        minimumLimit,
        _id,
        stock_name,
    } = useSelector((x) => x.stockList)

    const [state, setState] = useState({
        id: _id,
        description: description,
        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })
    const clear = () => {
        setState({
            id: '',
            description: '',
            minimumLimit: '',
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
    // // for getting vendor data
    // const { vendorData } = useSelector((state) => state.vendorList)
    // useEffect(() => {
    //     dispatch(getAllVendor())
    // }, [dispatch])

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
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'All Stock', path: '/allStock' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            <SimpleCard>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>
                            {showAlert && (
                                <div className={`alert alert-${alertType}`}>
                                    {alertText}
                                </div>
                            )}

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
                                label="Description"
                                errorMessages={['this field is required']}
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
            {/* <Box py="12px" /> */}
        </Container>
    )
}

export default AddStock
