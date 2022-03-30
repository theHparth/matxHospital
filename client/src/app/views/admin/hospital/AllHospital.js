import { Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb, FlexBox, Container, StyledButton } from 'app/components'
import React, { useState, useEffect } from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { H5, Small } from 'app/components/Typography'

// my import
import {
    getHospitalsData,
    setEditHospital,
    deleteHospital,
    hospitalStockInformation,
} from 'app/redux/actions/admin/HospitalActions'

const CustomerList = () => {
    const { hospitalsData = [] } = useSelector((state) => state.hospitalList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHospitalsData())
    }, [dispatch])
    // my import finish

    // for design
    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const bgError = palette.error.main
    const bgSuccess = palette.success.main

    const columns = [
        {
            name: 'hospitalName', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = hospitalsData[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={user?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>
                                    {user?.hospitalName}
                                </H5>
                                <Small sx={{ color: textMuted }}>
                                    {user?.email}
                                </Small>
                            </Box>
                        </FlexBox>
                    )
                },
            },
        },
        {
            name: 'address',
            label: 'Address',
            options: {
                filter: true,
                // customBodyRenderLite: (dataIndex) => (
                //     <span className="ellipsis">
                //         {hospitalsData[dataIndex].address}
                //     </span>
                // ),
            },
        },
        {
            name: 'pincode',
            label: 'Pincode',
            options: {
                filter: true,
            },
        },
        {
            name: 'contect',
            label: 'Contect',
            options: {
                filter: true,
            },
        },
        {
            name: '',
            label: '',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>

                        <StyledButton
                            sx={{ color: bgError }}
                            onClick={() => {
                                alert('Are you sure you want to delete?')
                                dispatch(
                                    deleteHospital(hospitalsData[dataIndex]._id)
                                )
                            }}
                        >
                            <Icon>delete</Icon>
                        </StyledButton>
                        <Box flexGrow={1}></Box>

                        <StyledButton
                            // variant="contained"
                            sx={{ color: bgSuccess }}
                        >
                            <Link
                                to={`/addHospital`}
                                onClick={() =>
                                    dispatch(
                                        setEditHospital(
                                            hospitalsData[dataIndex]
                                        )
                                    )
                                }
                            >
                                <Icon>edit</Icon>
                            </Link>
                        </StyledButton>
                    </FlexBox>
                ),
            },
        },

        {
            name: '',
            label: '',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>

                        <Link
                            to={`/hospitalData/${hospitalsData[dataIndex]._id}`}
                            onClick={() =>
                                dispatch(
                                    hospitalStockInformation(
                                        hospitalsData[dataIndex]._id
                                    )
                                )
                            }
                        >
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </FlexBox>
                ),
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Hospital', path: '/addHospital' },
                        { name: 'form' },
                    ]}
                />
            </div>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'All Hospital'}
                        data={hospitalsData}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
                            // filter: true,
                            // sort: true,
                            // selectableRows: "none", // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, //set pagination option
                            // viewColumns: false, // set column option

                            elevation: 1,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                            customSearchRender: (
                                searchText,
                                handleSearch,
                                hideSearch,
                                options
                            ) => {
                                return (
                                    <Grow appear in={true} timeout={300}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={({ target: { value } }) =>
                                                handleSearch(value)
                                            }
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                startAdornment: (
                                                    <Icon
                                                        fontSize="small"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        search
                                                    </Icon>
                                                ),
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={hideSearch}
                                                    >
                                                        <Icon fontSize="small">
                                                            clear
                                                        </Icon>
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grow>
                                )
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default CustomerList
