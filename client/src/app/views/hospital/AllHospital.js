import React from 'react'

import HospitalData from './HospitalData'
import { Box, styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'

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

const AllHospital = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            {/* <SimpleCard title="Simple Table">
                <SimpleTable />
            </SimpleCard> */}
            <Box py="12px" />
            <SimpleCard title="Hospital List">
                <HospitalData />
            </SimpleCard>
        </Container>
    )
}

export default AllHospital
