import { generateRandomId } from 'app/utils/utils'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid, Snackbar, Alert } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { useDispatch, useSelector } from 'react-redux'

import {
    edit,
    add,
    clearValueStock,
} from 'app/redux/actions/admin/StockActions'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const StockEditDialog = ({ uid, open, handleClose }) => {
    const {
        alertType,
        showAlert,
        clearValues,
        isLoading,
        isEditing,
        description,
        minimumLimit,
        _id,
        stock_name,
        alertText,
    } = useSelector((x) => x.stockList)

    const [newStock, setNewStock] = useState({
        id: _id,
        description: description,
        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })

    // const clear = () => {
    //     setState({
    //         id: '',
    //         description: '',
    //         minimumLimit: '',
    //         stock_name: '',
    //     })
    // }
    const dispatch = useDispatch()

    const cancleWithClean = () => {
        dispatch(clearValueStock())
        // clear()
        handleClose()
    }
    console.log(alertType, 'outside alertType')

    useEffect(() => {
        if (clearValues == true) {
            dispatch(clearValueStock())
            cancleWithClean()
        }
    }, [clearValues])

    // console.log(isEditing, 'editing')

    // useEffect(() => {
    //     dispatch(add(newStock))
    // }, [isEditing])

    // if (clearValues) {
    //     dispatch(clearValueStock())
    //     cancleWithClean()
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEditing) {
            dispatch(edit(newStock))
        } else {
            dispatch(add(newStock))
            console.log(alertType, 'inside alertType')

            // cancleWithClean()
            // if (alertType == 'success') {
            //     handleClose()
            // }
        }
    }

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setNewStock({
            ...newStock,
            [name]: value,
        })
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                {isEditing ? (
                    <H4 sx={{ mb: '20px' }}>Update Stock</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>Add new stock</H4>
                )}
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="stock_name"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.stock_name}
                                validators={['required']}
                                label="Stock Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="description"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="minimumLimit"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.minimumLimit}
                                validators={['required']}
                                label="Minimum limit to show warning"
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
                    <Alert severity={alertType} sx={{ width: '100%' }}>
                        {alertText}
                    </Alert>
                </Snackbar>
            ) : null}
        </Dialog>
    )
}

export default StockEditDialog
