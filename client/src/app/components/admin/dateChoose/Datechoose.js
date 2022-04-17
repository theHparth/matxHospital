import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'

import { topBarHeight } from 'app/utils/constant'

import 'rsuite/styles/index.less'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
// import { dateFns } from 'date-fns'
const DateContainer2 = styled('div')(() => ({}))

const DateContainer = styled('div')(() => ({
    position: 'absolute',
    top: 27,
    left: 900,
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

const DateChoose = ({ dateProjection, onSearchDate }) => {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 10)

    const [state, setState] = useState()

    useEffect(() => {
        // console.log('state', state)
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
                    // value={onSearchDate}
                    // disabledDate={(date) => dateFns.isAfter(date, new Date())}
                    // maxDate={new Date()}
                />
            </DateContainer>
        </React.Fragment>
    )
}

export { DateChoose, DateContainer, DateContainer2 }
// import { styled } from '@mui/system'
// import React, { useState, useEffect } from 'react'

// import 'react-date-range/dist/styles.css' // main css file
// import 'react-date-range/dist/theme/default.css'

// import { topBarHeight } from 'app/utils/constant'

// import 'rsuite/styles/index.less'
// import { DateRangePicker } from 'rsuite'
// import 'rsuite/dist/rsuite.min.css'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

// const DateContainer2 = styled('div')(() => ({}))

// const DateContainer = styled('div')(() => ({
//     position: 'absolute',
//     top: 27,
//     left: 900,
//     zIndex: 9,
//     // width: '20%',
//     // display: 'flex',
//     paddingRight: '90px',
//     alignItems: 'center',
//     height: topBarHeight,
//     // background: theme.palette.primary.main,
//     // color: theme.palette.text.primary,
//     // '&::placeholder': {
//     //     color: theme.palette.text.primary,
//     // },
// }))

// const SearchInput = styled('input')(({ theme }) => ({
//     width: '100%',
//     // border: 'none',
//     // outline: 'none',
//     fontSize: '1rem',
//     paddingLeft: '20px',
//     height: 'calc(100% - 25px)',
//     // background: theme.palette.primary.main,
//     // color: theme.palette.text.primary,
//     // '&::placeholder': {
//     //     color: theme.palette.text.primary,
//     // },
// }))

// const DateChoose = ({ dateProjection }) => {
//     const [startDate, setStartDate] = useState(null)
//     const [endDate, setEndDate] = useState(new Date())
//     const onChange = (dates) => {
//         const [start, end] = dates
//         setStartDate(start)
//         setEndDate(end)
//         console.log(startDate)
//     }
//     const oneYearAgo = new Date()
//     oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 10)

//     // const [state, setState] = useState()

//     useEffect(() => {
//         // console.log('state', state)
//         dateProjection(startDate)
//     }, [startDate])
//     return (
//         <React.Fragment>
//             <DateContainer>
//                 {/* <DateRangePicker
//                     appearance="default"
//                     placeholder="Default"
//                     style={{ width: 230 }}
//                     onChange={(item) => setState(item)}
//                 /> */}
//                 <DatePicker
//                     selected={startDate}
//                     onChange={onChange}
//                     startDate={startDate}
//                     endDate={endDate}
//                     selectsRange
//                     inline
//                 />{' '}
//             </DateContainer>
//         </React.Fragment>
//     )
// }

// export { DateChoose, DateContainer, DateContainer2 }
