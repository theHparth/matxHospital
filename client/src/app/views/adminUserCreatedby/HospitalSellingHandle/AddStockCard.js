import React from 'react'
import { SimpleCard } from 'app/components'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import {
    Badge,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
)

const AddStockCard = ({ stockData, stockOutData, setStockOutData, index }) => {
    // console.log('leftSlice', ...stockOutData.slice(0, index))
    // console.log(
    //     'rightSlice',
    //     ...stockOutData.slice(index + 1, stockOutData.length)
    // )
    const handleChange = (e) => {
        const { name, value } = e.target
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                ...stockOutData[index],
                [name]: value,
                hospitalName: index === 0 && name==="hospitalName" ? value : stockOutData[0].hospitalName
            },
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
        console.log(stockOutData)
    }

    const clearForm = () => {
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                hospitalName: '',
                stockName: '',
                availableQuantity: '',
                quantity: '',
                quantityPerBox: '',
                isPriceIncluded: false,
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
    return (
        <Card
            sx={{
                minWidth: 275,
                display: 'flex',
                flexDirection: 'column',
                padding: '30px',
            }}
        >
            <div style={{ display: 'flex' }}>
                <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: 200 }}
                >
                    <InputLabel id="demo-simple-select-standard-label">
                        Hospital Name
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={stockOutData}
                        onChange={handleChange}
                        label="Age"
                        name="hospitalName"
                        value={stockData.hospitalName}
                        disabled={index > 0}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: 200 }}
                >
                    <Badge badgeContent={4} color="primary"></Badge>

                    <InputLabel id="demo-simple-select-standard-label">
                        Stock Name
                    </InputLabel>

                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={age}
                        onChange={handleChange}
                        label="Stock Name"
                        name="stockName"
                        value={stockData.stockName}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    sx={{ width: '100px', height: '40px', marginLeft: 'auto' }}
                    onClick={clearForm}
                >
                    Clear
                </Button>
            </div>
            <div style={{ display: 'flex' }}>
                <TextField
                    id="standard-basic"
                    label="Quantity"
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: 200 }}
                    name="quantity"
                    value={stockData.quantity}
                    onChange={handleChange}
                />
                <TextField
                    id="standard-basic"
                    label="Quantity Per Box"
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: 200 }}
                    name="quantityPerBox"
                    value={stockData.quantityPerBox}
                    onChange={handleChange}
                />

                <TextField
                    id="standard-basic"
                    label="Price Per Box"
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: 200 }}
                    name="pricePerBox"
                    value={stockData.pricePerBox}
                    onChange={handleChange}
                />

                <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: '100px', height: '40px', marginLeft: 'auto' }}
                    onClick={removeField}
                >
                    Remove
                </Button>
            </div>
        </Card>
    )
}

export default AddStockCard
