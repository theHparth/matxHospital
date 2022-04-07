import { Button, Card, Paper, TextField } from '@mui/material'
import { SimpleCard, Breadcrumb, ContainerForm } from 'app/components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddStockCard from './AddStockCard'

import { getAllData } from 'app/redux/actions/admin/StockActions'
import { getAllVendor } from 'app/redux/actions/admin/VendorActions'
import { edit, add } from 'app/redux/actions/admin/WareHouseAction'

function AddStockOutForm() {
    const navigate = useNavigate()

    let { stockData } = useSelector((state) => state.stockList)

    const dispatch = useDispatch()

    const { vendorData = [] } = useSelector((states) => states.vendorList)

    useEffect(() => {
        dispatch(getAllVendor())
    }, [dispatch])

    const [stockOutData, setStockOutData] = React.useState([
        {
            stock_name: '',
            price: '',
            totalQtyInOneBox: '',
            totalBox: '',
        },
    ])
    const emptyField = {
        invoiceNumStockIn: '',
        vendor_name: '',
        stockInDetail: '',
        stock_name: '',
        price: '',
        totalQtyInOneBox: '',
        totalBox: '',
    }

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const [vendor, setHospital] = React.useState()
    const onChangeVendor = (e) => {
        setHospital(e.target.value)
    }
    const [invoice, setInvoice] = React.useState()
    const onChangeInvoice = (e) => {
        setInvoice(e.target.value)
    }

    const handleSubmit = () => {
        const data = {
            invoiceNumStockIn: invoice,
            vendor_name: vendor,
            stockInDetail: stockOutData,
        }
        console.log('stock out data', data)
        dispatch(add(data))
        setStockOutData([emptyField])
    }

    return (
        <ContainerForm>
            <div>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Werehouse Stock Details',
                            path: '/wereHouseStock',
                        },
                        { name: 'Table' },
                    ]}
                />
            </div>
            <Card
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '30px',
                }}
            >
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
                            onSubmit={handleSubmit}
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                Vendor Name
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={onChangeVendor}
                                label="Age"
                                name="vendor_name"
                                value={vendor || ''}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {vendorData.map((vendorObj, index) => (
                                    <MenuItem
                                        value={vendorObj.vendor_name}
                                        key={index}
                                    >
                                        {vendorObj.vendor_name}
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    key={'last'}
                                    onClick={() => navigate('/allVendor/new')}
                                >
                                    Add new vendor
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="standard-basic"
                            label="Invoice Number"
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                            name="invoiceNumStockIn"
                            value={invoice || ''}
                            onChange={onChangeInvoice}
                        />
                    </div>
                </Card>

                {stockOutData.map((stockOut, index) => (
                    <AddStockCard
                        key={index}
                        stockOut={stockOut}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                        stockData={stockData}
                        vendorData={vendorData}
                    />
                ))}
                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{
                            m: 1,
                            minWidth: 120,
                            width: 120,
                            marginLeft: 'auto',
                        }}
                        onClick={() =>
                            setStockOutData([...stockOutData, emptyField])
                        }
                    >
                        Add More
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            m: 1,
                            minWidth: 120,
                            width: 120,
                            marginLeft: 'auto',
                        }}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            </Card>
        </ContainerForm>
    )
}

export default AddStockOutForm
