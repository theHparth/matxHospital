import React, { useState } from 'react'
import { Divider, Tab, Tabs } from '@mui/material'
import { Breadcrumb } from 'app/components'
import CustomerDetails from './CustomerDetails'
import CustomerInvoice from './CustomerInvoice'
import CustomerLogs from './CustomerLogs'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import HospitalStockInfo from './HospitalStockInfo'
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const CustomerViewer = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const { id } = useParams()
    const handleTabChange = (e, value) => {
        setTabIndex(value)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/pages' },
                        { name: 'View Customer' },
                    ]}
                />
            </div>
            <Tabs
                sx={{ mt: 2 }}
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                {tabList.map((item, ind) => (
                    <Tab
                        key={ind}
                        value={ind}
                        label={item}
                        sx={{ textTransform: 'capitalize' }}
                    />
                ))}
            </Tabs>
            <Divider sx={{ mb: '24px' }} />

            {tabIndex === 0 && <HospitalStockInfo id={id} />}
            {tabIndex === 1 && <CustomerInvoice id={id} />}
            {tabIndex === 2 && <CustomerLogs id={id} />}
        </Container>
    )
}

const tabList = ['Stock Info.', 'Invoices', 'Logs']

export default CustomerViewer
