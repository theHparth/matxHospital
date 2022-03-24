import { Button, Card, Paper, TextField } from '@mui/material'
import { SimpleCard, Breadcrumb } from 'app/components'
import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddStockCard from './AddStockCard'
import { Container } from '../../components/MyComponents/form/index'
function AddStockOutForm() {
    const [stockOutData, setStockOutData] = React.useState([
        {
            hospitalName: '',
            stockName: '',
            availableQuantity: '',
            quantity: '',
            quantityPerBox: '',
            pricePerBox: '',
        },
    ])
    const emptyField = {
        hospitalName: '',
        stockName: '',
        availableQuantity: '',
        quantity: '',
        quantityPerBox: '',
        isPriceIncluded: false,
    }

    useEffect(async () => {
        const res = await fetch('/api/v1/stockOut/')
        console.log(res)
        const json = await res.json()
        console.log(json)
    }, [])

    console.log(stockOutData)
    return (
        <Container>
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
                {stockOutData.map((stockData, index) => (
                    <AddStockCard
                        stockData={stockData}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                    />
                ))}
                <Button
                    variant="outlined"
                    color="success"
                    sx={{ m: 1, minWidth: 120, width: 120, marginLeft: 'auto' }}
                    onClick={() =>
                        setStockOutData([...stockOutData, emptyField])
                    }
                >
                    Add More
                </Button>
            </Card>
        </Container>
    )
}

export default AddStockOutForm
