import { useSelector } from 'react-redux'

const Alert = () => {
    const { alertType, alertText } = useSelector((x) => x.hospitalList)
    return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert

// import React from 'react'
// import { Button } from '@mui/material'
// import { SnackbarProvider, useSnackbar } from 'notistack'

// function StackedSnackbar({ type, text }) {
//     const { enqueueSnackbar } = useSnackbar()

//     const handleClickVariant = (variant) => () => {
//         // variant could be success, error, warning, info, or default
//         enqueueSnackbar('This is a warning message!', { variant })
//     }

//     return (
//         <React.Fragment>
//             {/* <Button onClick={handleClickVariant('error')}>{text}</Button> */}
//         </React.Fragment>
//     )
// }

// export default function Alert() {
//     const { alertType, alertText } = useSelector((x) => x.hospitalList)

//     return (
//         <SnackbarProvider maxSnack={3}>
//             <StackedSnackbar typr={alertType} text={alertText} />
//         </SnackbarProvider>
//     )
// }
