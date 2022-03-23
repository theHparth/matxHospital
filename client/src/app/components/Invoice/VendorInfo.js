import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

function Item(props) {
    const { sx, ...other } = props
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                // bgcolor: (theme) =>
                //     theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                // border: '1px solid',
                // borderColor: (theme) =>
                //     theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                // borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    )
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.object,
                PropTypes.bool,
            ])
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
}

export default function VendorInfo({ currentVendor }) {
    return (
        <div style={{ height: "auto", width: '100%' }}>
            {Object.keys(currentVendor).map((vendor) => (
                <Box
                    sx={{
                        display: 'flex',
                        // justifyContent: 'space-between',
                        width: '100%',
                        // p: 1,
                        // bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <Item>{vendor}</Item>
                    <Item>{currentVendor[vendor]}</Item>
                </Box>
            ))}
        </div>
    )
}
