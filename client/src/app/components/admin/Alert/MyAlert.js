import { Snackbar, Alert } from '@mui/material'

const MyAlert = ({ isOpen, typeSeverity, alrtTextToShow }) => (
    <Snackbar open={isOpen} autoHideDuration={3000}>
        <Alert severity={typeSeverity} sx={{ width: '100%' }}>
            {alrtTextToShow}
        </Alert>
    </Snackbar>
)

export { MyAlert }
