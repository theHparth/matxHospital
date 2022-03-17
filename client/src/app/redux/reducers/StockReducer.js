import {
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_ERROR,
} from '../actions/StockActions'

const initialState = {
    stockData: [],
    isLoading: false,
    showAlert: true,
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    vendor_name: '',
    vendor_id: '',
    price: 0,
    qty: 0,
}

const VendorReducer = function (state = initialState, action) {
    switch (action.type) {
        case CREATE_BEGIN: {
            return { ...state, isLoading: true }
        }

        case CREATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Vendor Added!',
            }
        }
        case CREATE_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'warning',
                alertText: action.payload.msg,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default VendorReducer
