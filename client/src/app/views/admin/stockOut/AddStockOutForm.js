import { Button, Card, Paper, TextField } from '@mui/material'
import { SimpleCard, Breadcrumb, ContainerForm } from 'app/components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddStockCard from './AddStockCard'

import { sendToUser } from 'app/redux/actions/admin/StockOutAction'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockActions'
import {
    getHospitalsData,
    setEditHospital,
    deleteHospital,
} from 'app/redux/actions/admin/HospitalActions'
function AddStockOutForm() {
    let { stockData } = useSelector((state) => state.stockList)

    const dispatch = useDispatch()

    const { hospitalsData } = useSelector((state) => state.hospitalList)

    useEffect(() => {
        dispatch(getHospitalsData())
    }, [dispatch])

    // console.log('stock out', stockData)
    // console.log('hospitalsData', hospitalsData)
    const [stockOutData, setStockOutData] = React.useState([
        {
            // hospitalName: '',
            stock_name: '',
            availableQuantity: '',
            totalBox: '1',
            totalQtyInOneBox: '',
            pricePerBox: '',
            priceForUser: 0,
            price: stockData.price || 0,
        },
    ])
    const emptyField = {
        hospitalName: '',
        stock_name: '',
        availableQuantity: '',
        totalBox: '',
        totalQtyInOneBox: '',
        priceForUser: 0,
        price: 0,
    }

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    console.log(stockOutData)

    const [hospital, setHospital] = React.useState()
    const onChangeHospital = (e) => {
        const name = e.target.name
        const value = e.target.value

        setHospital(e.target.value)
    }

    const handleSubmit = () => {
        const data = {
            hospitalName: hospital,
            stockOutDetail: stockOutData,
            // stockOutDetail: stockOutData.map((data) => ({
            //     stock_name: data.stock_name,
            //     totalQtyInOneBox: Number(data.totalQtyInOneBox),
            //     totalBox: Number(data.totalBox),
            //     price: Number(data.price),
            //     priceForUser: Number(data.priceForUser),
            // })),
        }
        console.log('stock out data', data)
        dispatch(sendToUser(data))
        setStockOutData([emptyField])
    }
    const aaa = () => {}
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
                            value={hospital || ''}
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
                        onClick={() =>
                            // setStockOutData([...stockOutData, emptyField])
                            handleSubmit()
                        }
                    >
                        Submit
                    </Button>
                </div>
            </Card>
        </ContainerForm>
    )
}

export default AddStockOutForm
