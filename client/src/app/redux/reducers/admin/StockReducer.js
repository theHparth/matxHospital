import {
    CREATE_BEGIN,
    CREATE_SUCCESS_STOCK,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_STOCK,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_BEGIN,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES_STOCK,
    HANDLE_CHANGE,
    CLEAR_STOCK_ALERT,
    DISPLAY_STOCK_ALERT,
    DELETE_STOCK_SUCCESS,
} from '../../actions/admin/StockActions'

const initialState = {
    stockData: [],
    isLoading: false,
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    price: 0,
    qty: 0,
    totalQtyInOneBox: 0,
    totalBox: 0,
    box: 0,
    stock_name: '',
    minimumLimit: '',
}

const StockReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS_STOCK: {
            return {
                ...state,
                stockData: action.payload.stockList,
            }
        }
        case CREATE_BEGIN: {
            return { ...state, isLoading: true }
        }

        case CREATE_SUCCESS_STOCK: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New stock data added!',
                clearValues: true,
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
        case HANDLE_CHANGE: {
            return {
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value,
            }
        }
        case EDIT_BEGIN: {
            return {
                ...state,
                isLoading: true,
                isEditing: true,
            }
        }
        // edit VENDOR
        case EDIT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Stock data updated successfully',
            }
        }
        case DELETE_STOCK_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Stock data removed successfully',
            }
        }
        case EDIT_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'error',
            }
        }
        //delete state
        case DELETE_BEGIN: {
            return { ...state, isLoading: false }
        }
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const { _id, description, minimumLimit, stock_name } = subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                description,
                minimumLimit,
                stock_name,
            }
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
        case CLEAR_VALUES_STOCK: {
            const initialState = {
                // alertType: '',
                isEditing: false,
                clearValues: '',
                _id: '',
                description: '',
                minimumLimit: '',
                stock_name: '',
            }
            return {
                ...state,
                ...initialState,
            }
        }
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
export default StockReducer
