import { Button, Card, Paper, TextField } from '@mui/material'
import { SimpleCard, Breadcrumb, ContainerForm, MyAlert } from 'app/components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddStockCard from './AddStockCard'

import {
    sendToUser,
    edit,
    clearValuesStockOut,
} from 'app/redux/actions/admin/StockOutAction'
import { getAllData } from 'app/redux/actions/admin/StockActions'
import { getHospitalsData } from 'app/redux/actions/admin/HospitalActions'
function AddStockOutForm() {
    let { stockData } = useSelector((state) => state.stockList)
    const { hospitalsData } = useSelector((state) => state.hospitalList)

    const dispatch = useDispatch()

    const {
        isLoading,
        showAlert,
        clearValues,
        alertType,
        alertText,
        isEditing,
        _id,
        hospitalName,
        invoiceNum,
        stockOutDetail,
        messageForHospital,
    } = useSelector((state) => state.stockOutList)

    useEffect(() => {
        dispatch(getHospitalsData())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    useEffect(() => {
        if (stockOutDetail.length) {
            setStockOutData(stockOutDetail)
        }
    }, [])
    console.log(stockOutDetail)
    const [stockOutData, setStockOutData] = React.useState([
        {
            stock_name: '',
            availableQuantity: '',
            totalBox: '',
            totalQtyInOneBox: '',
            priceForUser: '',
            price: stockData.price || 0,
        },
    ])
    const emptyField = {
        stock_name: '',
        // availableQuantity: '',
        totalBox: '',
        totalQtyInOneBox: '',
        priceForUser: '',
        // price: 0,
    }

    const [hospital, setHospital] = React.useState({
        hospitalName: hospitalName || '',
    })
    const onChangeHospital = (e) => {
        const name = e.target.name
        const value = e.target.value

        setHospital({
            ...hospital,
            [name]: value,
        })
    }
    useEffect(() => {
        if (clearValues) {
            dispatch(clearValuesStockOut())
            hospital.hospitalName = ''
        }
    }, [clearValues])

    const handleSubmit = () => {
        const data = {
            id: _id,
            hospitalName: hospital.hospitalName,
            stockOutDetail: stockOutData,
            invoiceNum: invoiceNum,
        }
        // dispatch(sendToUser(data))
        if (!isEditing) {
            dispatch(sendToUser(data))
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
                        padding: '30px',
                    }}
                >
                    <FormControl
                        onSubmit={handleSubmit}
                        variant="standard"
                        sx={{ m: 1, minWidth: 120, width: 200 }}
                    >
                        <InputLabel id="demo-simple-select-standard-label">
                            Hospital Name
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={onChangeHospital}
                            label="Age"
                            name="hospitalName"
                            value={hospital.hospitalName || ''}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {hospitalsData.map((hospitalObj, index) => (
                                <MenuItem
                                    value={hospitalObj.hospitalName}
                                    key={index}
                                >
                                    {hospitalObj.hospitalName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Card>

                {stockOutData.map((stockOut, index) => (
                    <AddStockCard
                        key={index}
                        stockOut={stockOut}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                        stockData={stockData}
                        hospitalsData={hospitalsData}
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
            {showAlert ? (
                <MyAlert
                    isOpen={showAlert}
                    typeSeverity={alertType}
                    alrtTextToShow={alertText}
                />
            ) : null}
        </ContainerForm>
    )
}

export default AddStockOutForm
