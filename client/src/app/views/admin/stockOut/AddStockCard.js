import React, { useEffect, useState } from 'react'
import { SimpleCard } from 'app/components'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { Badge, Button, Snackbar, Chip, Alert, TextField } from '@mui/material'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
)

const AddStockCard = ({
    stockOut,
    stockOutData,
    setStockOutData,
    index,
    stockData,
    hospitalsData,
}) => {
    const [availableQuantity, setAvailableQuantity] = useState({ totalQty: 0 })

    const handleChange = (e) => {
        const { name, value } = e.target
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                ...stockOutData[index],
                [name]: value,
                price: availableQuantity.price,
            },
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
        console.log(stockOutData)
    }

    const clearForm = () => {
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                stock_name: '',
                availableQuantity: '',
                totalBox: '',
                totalQtyInOneBox: '',
                // isPriceIncluded: false,
                price: stockData.price,
                priceForUser: '',
            },
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
    }

    const removeField = () => {
        setStockOutData([
            ...stockOutData.slice(0, index),
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
    }

    useEffect(() => {}, [])
    const aaa = () => {}
    return (
        <div>
            <ValidatorForm onError={() => null} onSubmit={aaa}>
                <Card
                    sx={{
                        minWidth: 275,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0px 30px 30px 30px',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                        >
                            <Badge
                                badgeContent={availableQuantity.totalQty}
                                color="primary"
                                max={999999}
                                sx={{
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            ></Badge>

                            <InputLabel id="demo-simple-select-standard-label">
                                Stock Name
                            </InputLabel>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                label="Stock Name"
                                name="stock_name"
                                value={stockOut.stock_name}
                                data-index={availableQuantity}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stockData.map((stockObj, index) => (
                                    <MenuItem
                                        key={index}
                                        value={stockObj.stock_name}
                                        onClick={() => {
                                            setAvailableQuantity(stockObj)
                                        }}
                                    >
                                        {stockObj.stock_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {availableQuantity.price ? (
                            <Chip
                                label={`costPrice - ${availableQuantity.price}`}
                                color="secondary"
                                // disabled={true}
                                sx={{
                                    width: '100px',
                                    height: '20px',
                                    marginLeft: '20px',
                                }}
                            />
                        ) : null}

                        <Button
                            variant="outlined"
                            sx={{
                                width: '100px',
                                height: '40px',
                                marginLeft: 'auto',
                            }}
                            onClick={clearForm}
                        >
                            Clear
                        </Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TextValidator
                            id="standard-basic"
                            label="Box"
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                            name="totalBox"
                            value={stockOut.totalBox}
                            onChange={handleChange}
                            validators={[
                                'required',
                                'minNumber:1',
                                // `maxNumber:${
                                //     availableQuantity.totalQty -
                                //     stockOutData[index]['totalBox'] *
                                //         stockOutData[index]['totalQtyInOneBox']
                                // }`,
                            ]}
                        />
                        <TextField
                            id="standard-basic"
                            label="Quantity Per Box"
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                            name="totalQtyInOneBox"
                            value={stockOut.totalQtyInOneBox}
                            onChange={handleChange}
                            validators={[
                                'required',
                                'minNumber:1',
                                // `maxNumber:${
                                //     availableQuantity.totalQty -
                                //     stockOutData[index]['totalBox'] *
                                //         stockOutData[index]['totalQtyInOneBox']
                                // }`,
                            ]}
                        />

                        <TextField
                            id="standard-basic"
                            label="Price For user"
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                            name="priceForUser"
                            value={stockOut.priceForUser}
                            onChange={handleChange}
                        />

                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                width: '100px',
                                height: '40px',
                                marginLeft: 'auto',
                            }}
                            onClick={removeField}
                        >
                            Remove
                        </Button>
                    </div>
                </Card>
            </ValidatorForm>
            {/* {showAlert ? (
                <Snackbar open={showAlert} autoHideDuration={19000}>
                    <Alert
                        severity={
                            alertText === 'Stock send successfully' ||
                            alertText === 'Data updated successfully'
                                ? 'success'
                                : 'error'
                        }
                        sx={{ width: '100%' }}
                    >
                        {alertText}
                    </Alert>
                </Snackbar>
            ) : null} */}
        </div>
    )
}

export default AddStockCard
