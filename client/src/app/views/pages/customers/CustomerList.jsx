import Axios from 'axios'
import { Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb, FlexBox, Container } from 'app/components'
import React, { useState, useEffect } from 'react'
import { Avatar, Grow, Icon, IconButton, TextField } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H5, Small } from 'app/components/Typography'

const CustomerList = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        Axios.get('/api/user/all').then(({ data }) => {
            if (isAlive) setUserList(data)
        })
        return () => setIsAlive(false)
    }, [isAlive])
    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = userList[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={user?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>{user?.name}</H5>
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
                //   <span className="ellipsis">{userList[dataIndex].address}</span>
                // ),
            },
        },
        {
            name: 'company',
            label: 'Company',
            options: {
                filter: true,
            },
        },
        {
            name: 'balance',
            label: 'Balance',
            options: {
                filter: true,
            },
        },
        {
            name: 'action',
            label: ' ',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>
                        <Link to="/pages/new-customer">
                            <IconButton>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Link>
                        <Link to="/pages/view-customer">
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
                        { name: 'Pages', path: '/pages' },
                        { name: 'Customer List' },
                    ]}
                />
            </div>
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'All Customers'}
                        data={userList}
                        columns={columns}
                        options={{
                            filterType: 'checkbox',
                            responsive: 'standard',
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
