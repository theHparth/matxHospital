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

    const dispatch = useDispatch()
    let { stockData } = useSelector((state) => state.stockList)
    const { vendorData = [] } = useSelector((states) => states.vendorList)
    const {
        isLoading,
        showAlert,
        clearValues,
        alertType,
        alertText,
        isEditing,
        _id,
        invoiceNumStockIn,
        vendor_name,
        stockInDetail,
    } = useSelector((x) => x.wareHouseStockList)

    useEffect(() => {
        dispatch(getAllVendor())
    }, [dispatch])

    var [stockOutData, setStockOutData] = React.useState([
        {
            stock_name: '',
            price: '',
            totalQtyInOneBox: '',
            totalBox: '',
            priceType: 'individualPrice',
        },
    ])
    useEffect(() => {
        if (stockInDetail.length) {
            setStockOutData(stockInDetail)
        }
    }, [])

    const emptyField = {
        stock_name: '',
        price: '',
        totalQtyInOneBox: '',
        totalBox: '',
    }

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const [newVendorInvoice, setVendorInvoice] = React.useState({
        invoiceNumStockIn: invoiceNumStockIn || '',
        vendor_name: vendor_name || '',
    })
    const onChangeVendorInvoice = (e) => {
        const name = e.target.name
        const value = e.target.value

        setVendorInvoice({
            ...newVendorInvoice,
            [name]: value,
        })
    }

    const handleSubmit = () => {
        const data = {
            id: _id,
            invoiceNumStockIn: newVendorInvoice.invoiceNumStockIn,
            vendor_name: newVendorInvoice.vendor_name,
            stockInDetail: stockOutData,
        }
        console.log('stock out data', data)
        if (!isEditing) {
            dispatch(add(data))
        } else {
            dispatch(edit(data))
        }
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
                        padding: '10px 30px 30px 30px',
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
                                onChange={onChangeVendorInvoice}
                                label="Age"
                                name="vendor_name"
                                value={newVendorInvoice.vendor_name || ''}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {vendorData.map((vendorObj, index) => (
                                    <MenuItem
                                        value={
                                            newVendorInvoice.vendor_name ||
                                            vendorObj.vendor_name
                                        }
                                        key={index}
                                    >
                                        {newVendorInvoice.vendor_name ||
                                            vendorObj.vendor_name}
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
                            value={newVendorInvoice.invoiceNumStockIn || ''}
                            onChange={onChangeVendorInvoice}
                        />
                    </div>
                </Card>

                {/* {!stockInDetail
                    ?  */}
                {stockOutData.map((stockOut, index) => (
                    <AddStockCard
                        key={index}
                        stockOut={stockOut}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                        stockData={stockData}
                        vendorData={vendorData}
                        updateStockInDetail={stockInDetail}
                    />
                ))}
                {/* : stockInDetail.map((updateStockInDetaili, index) => (
                          <AddStockCard
                              key={index}
                              stockOut={updateStockInDetaili}
                              stockOutData={stockOutData}
                              setStockOutData={setStockOutData}
                              index={index}
                              stockData={stockData}
                              vendorData={vendorData}
                              updateStockInDetail={updateStockInDetaili}
                          />
                      ))} */}

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
