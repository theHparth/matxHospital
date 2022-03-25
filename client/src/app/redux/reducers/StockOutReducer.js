import {
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_STOCKOUT_STATUS_TRUE,
    GET_SUCCESS_STOCKOUT_STATUS_FALSE,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_BEGIN,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES,
    HANDLE_CHANGE,
    CLEAR_STOCK_ALERT,
    DISPLAY_STOCK_ALERT,
} from '../actions/StockOutAction'

const initialState = {
    stockOutDataTrue: [],
    stockOutDataFalse: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    // vendor_name: '',
    _id: '',
    hospitalName: '',
    stock_name: '',
    totalQtyInOneBox: 1,
    totalBox: 1,
    price: 1,
    priceForUser: 1,
    status: false,
    showPrice: false,
}

const StockOutReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS_STOCKOUT_STATUS_TRUE: {
            return {
                ...state,
                stockOutDataTrue: action.payload.stockOutDataTrueStatus,
            }
        }
        case GET_SUCCESS_STOCKOUT_STATUS_FALSE: {
            return {
                ...state,
                stockOutDataFalse: action.payload.stockOutDataFalseStatus,
            }
        }
        case CREATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Stock send successfully',
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
        // edit VENDOR
        case EDIT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Data updated successfully',
                _id: '',
            }
        }
        case EDIT_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'danger',
            }
        }
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const {
                _id,
                hospitalName,
                stock_name,
                totalQtyInOneBox,
                totalBox,
                status,
                price,
                priceForUser,
            } = subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                hospitalName,
                stock_name,
                totalQtyInOneBox,
                totalBox,
                status,
                price,
                priceForUser,
            }
        }

        case DELETE_BEGIN: {
            return { ...state, isLoading: true }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_STOCK_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        // case CLEAR_VALUES: {
        //     const initialState = {
        //         vendor_name: '',
        //         address: '',
        //         contect: '',
        //         password: '',
        //         email: '',
        //         pincode: '',
        //     }
        //     return {
        //         ...state,
        //         ...initialState,
        //     }
        // }
        case DISPLAY_STOCK_ALERT: {
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}
export default StockOutReducer
