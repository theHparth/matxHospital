import { Box, styled, useTheme } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { H4 } from '../../Typography'
import {
    Dialog,
    IconButton,
    Button,
    Icon,
    Grid,
    TextField,
} from '@mui/material'
import moment from 'moment'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker2 from '@mui/lab/DateTimePicker'
import { topBarHeight } from 'app/utils/constant'
import { addDays } from 'date-fns'
// import { DateRangePicker } from 'react-date-range'

import 'rsuite/styles/index.less'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

const DateContainer2 = styled('div')(({ theme }) => ({}))

const DateContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 110,
    left: 600,
    zIndex: 9,
    // width: '20%',
    // display: 'flex',
    paddingRight: '90px',
    alignItems: 'center',
    height: topBarHeight,
    // background: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    // '&::placeholder': {
    //     color: theme.palette.text.primary,
    // },
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    // border: 'none',
    // outline: 'none',
    fontSize: '1rem',
    paddingLeft: '20px',
    height: 'calc(100% - 25px)',
    // background: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    // '&::placeholder': {
    //     color: theme.palette.text.primary,
    // },
}))

const DateChoose = ({ dateProjection }) => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    const { palette } = useTheme()
    const textColor = palette.text.primary
    const iconStyle = { color: textColor }

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 10)

    const [state, setState] = useState()

    useEffect(() => {
        dateProjection(state)
    }, [state])
    return (
        <React.Fragment>
            <DateContainer>
                <DateRangePicker
                    appearance="default"
                    placeholder="Default"
                    style={{ width: 230 }}
                    onChange={(item) => setState(item)}
                />
            </DateContainer>
            {/* {!open && (
                <DateContainer>
                    <IconButton onClick={toggle}>
                        <Icon sx={iconStyle}>timer</Icon>
                    </IconButton>
                </DateContainer>
            )}

            {open && (
                <DateContainer>
                  
                    <DateRangePicker
                        onChange={(item) => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                       
                    />
                    <IconButton
                        onClick={toggle}
                        sx={{ mx: 2, verticalAlign: 'middle' }}
                    >
                        <Icon sx={{ color: textColor }}>close</Icon>
                    </IconButton>
                </DateContainer>
            )} */}
        </React.Fragment>
    )
}

export { DateChoose, DateContainer, DateContainer2 }
