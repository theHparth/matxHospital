import { Box, styled, useTheme } from '@mui/system'
import React, { useState } from 'react'
import { H4 } from '../../Typography'
import {
    Dialog,
    IconButton,
    Button,
    Icon,
    Grid,
    TextField,
} from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker2 from '@mui/lab/DateTimePicker'
import { topBarHeight } from 'app/utils/constant'

const DateContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 1170,
    zIndex: 9,
    paddingRight: '20px',
    // alignItems: 'center',
}))
const DateContainer2 = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 500,
    zIndex: 9,
    paddingRight: '90px',
    // alignItems: 'center',
}))

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 25,
    left: 700,
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

const DateChoose = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    const { palette } = useTheme()
    const textColor = palette.text.primary
    const iconStyle = { color: textColor }

    return (
        <React.Fragment>
            {!open && (
                <SearchContainer>
                    <IconButton onClick={toggle}>
                        <Icon sx={iconStyle}>timer</Icon>
                    </IconButton>
                </SearchContainer>
            )}

            {open && (
                <SearchContainer>
                    <SearchInput
                        type="text"
                        placeholder="Search here..."
                        autoFocus
                    />
                    <IconButton
                        onClick={toggle}
                        sx={{ mx: 2, verticalAlign: 'middle' }}
                    >
                        <Icon sx={{ color: textColor }}>close</Icon>
                    </IconButton>
                </SearchContainer>
            )}
        </React.Fragment>

        // const handleDateChange = (date, name) => {
        //     // setState({
        //     //     ...state,
        //     //     [name]: date,
        //     // })
        // }
        // return (
        //     <Grid container spacing={4}>
        //         <Grid item sm={6} xs={12}>
        //             <LocalizationProvider dateAdapter={AdapterDateFns}>
        //                 <DateTimePicker2
        //                     value={new Date()}
        //                     onChange={(date) => handleDateChange(date, 'start')}
        //                     renderInput={(props) => (
        //                         <TextField
        //                             {...props}
        //                             label="Start date"
        //                             variant="standard"
        //                         />
        //                     )}
        //                 />
        //             </LocalizationProvider>
        //         </Grid>
        //         <Grid item sm={6} xs={12}>
        //             <LocalizationProvider dateAdapter={AdapterDateFns}>
        //                 <DateTimePicker2
        //                     value={new Date()}
        //                     onChange={(date) => handleDateChange(date, 'end')}
        //                     renderInput={(props) => (
        //                         <TextField
        //                             {...props}
        //                             label="End date"
        //                             variant="standard"
        //                         />
        //                     )}
        //                 />
        //             </LocalizationProvider>
        //         </Grid>
        //     </Grid>
    )
}

export { DateChoose, DateContainer, DateContainer2 }

// import React, { useState } from 'react'
// import { styled, useTheme } from '@mui/system'
// import { Icon, IconButton } from '@mui/material'
// import { topBarHeight } from 'app/utils/constant'

// const SearchBox = () => {
//     const [open, setOpen] = useState(false)
//     const toggle = () => {
//         setOpen(!open)
//     }
//     const { palette } = useTheme()
//     const textColor = palette.text.primary
//     const iconStyle = { color: textColor }

//     return (
//         <React.Fragment>
//             {!open && (
//                 <SearchContainer>
//                     <IconButton onClick={toggle}>
//                         <Icon sx={iconStyle}>search</Icon>
//                     </IconButton>
//                 </SearchContainer>
//             )}

//             {open && (
//                 <SearchContainer>
//                     <SearchInput
//                         type="text"
//                         placeholder="Search here..."
//                         autoFocus
//                     />
//                     <IconButton
//                         onClick={toggle}
//                         sx={{ mx: 2, verticalAlign: 'middle' }}
//                     >
//                         <Icon sx={{ color: textColor }}>close</Icon>
//                     </IconButton>
//                 </SearchContainer>
//             )}
//         </React.Fragment>
//         // <div>
//         //     <SearchContainer>
//         //         <SearchInput
//         //             type="text"
//         //             placeholder="Search here..."
//         //             autoFocus
//         //         />
//         //     </SearchContainer>
//         //     {/* )} */}
//         // </div>
//     )
// }

// export { SearchBox, SearchInput, SearchContainer }
