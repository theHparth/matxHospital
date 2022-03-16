import React from 'react'
import SimpleForm from './SimpleForm'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { useParams } from 'react-router-dom'

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

const AddHospital = () => {
    const params = useParams()

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard>
                <SimpleForm />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AddHospital
