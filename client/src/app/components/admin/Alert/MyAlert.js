import { Snackbar, Alert } from '@mui/material'

const MyAlert = ({ isOpen, typeSeverity, alrtTextToShow }) => (
    <Snackbar
        open={isOpen}
        autoHideDuration={typeSeverity == 'danger' ? 5000 : 3000}
        vertical="top"
        horizontal="center"
    >
        <Alert
            severity={typeSeverity}
            sx={{ width: '100%' }}
            // vertical="top"
            // horizontal="center"
        >
            {alrtTextToShow}
        </Alert>
    </Snackbar>
)

export { MyAlert }
