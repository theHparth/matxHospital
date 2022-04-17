import {
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_STOCKOUT_STATUS_TRUE,
    GET_SUCCESS_STOCKOUT_STATUS_FALSE,
    SET_EDIT,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES_STOCK_USER,
    HANDLE_CHANGE,
    STATUS_EDIT_SUCCESS,
    CLEAR_STOCK_ALERT_USER,
    DISPLAY_STOCK_ALERT,
    SET_EDIT_MINIMUM_LIMIT,
    GET_SUCCESS_PRESENT_STOCK,
    EDIT_MINIMUM_SUCCESS,
} from '../../actions/userCreatedByAdmin/StockInUserAction'

const initialState = {
    stockInUserData: [],
    presentStockUserData: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    hospitalName: '',
    stock_name: '',
    totalQtyInOneBox: 1,
    totalBox: 1,
    price: 1,
    status: false,
    showPrice: false,
    minimumLimit: 1,
}

const StockInUserReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }

        case GET_SUCCESS_STOCKOUT_STATUS_FALSE: {
            return {
                ...state,
                stockInUserData: action.payload.stockInUser,
                isLoading: false,
            }
        }
        case GET_SUCCESS_PRESENT_STOCK: {
            return {
                ...state,
                presentStockUserData: action.payload.presentStockUser,
                isLoading: false,
            }
        }
        case SET_EDIT_MINIMUM_LIMIT: {
            const subscriber = action.payload.subscriber
            const { _id, minimumLimit, stock_name } = subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                minimumLimit,
                stock_name,
            }
        }
        case EDIT_MINIMUM_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Minimum limit updated successfully',
            }
        }
        case STATUS_EDIT_SUCCESS: {
            return {
                ...state,

                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                alertText: 'New stock received received successfully',
                status: true,
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

        /////////////////////////////////////////////////////////

        case CLEAR_STOCK_ALERT_USER: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_STOCK_USER: {
            const initialState = {
                clearValues: '',
                _id: '',
                minimumLimit: '',
                stock_name: '',
            }
            return {
                ...state,
                ...initialState,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}
export default StockInUserReducer
