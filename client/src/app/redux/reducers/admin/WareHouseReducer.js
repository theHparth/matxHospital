import {
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_BEGIN,
    EDIT_SUCCESS_STOCKIN,
    EDIT_ERROR,
    CLEAR_VALUES_STOCKIN,
    HANDLE_CHANGE,
    CLEAR_STOCKIN_ALERT,
    DISPLAY_STOCK_ALERT,
    GET_SET_VENDORNAME,
    DELETE_STOCKIN_SUCCESS,
} from '../../actions/admin/WareHouseAction'

const initialState = {
    wereHouseStockData: [],
    isLoading: false,
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,

    price: 1,
    // remove after
    qty: 1,
    box: 1,
    stock_name: '',
    stockTotoalPrice: 1,
    // new
    _id: '',
    invoiceNumStockIn: '',
    vendor_name: '',
    stockInDetail: '',
}

const WareHouseReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS: {
            return {
                ...state,
                wereHouseStockData: action.payload.stockList,
            }
        }

        case CREATE_BEGIN: {
            return { ...state, isLoading: true }
        }

        case CREATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                clearValues: true,
                alertText: 'New stock data added!',
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
        case EDIT_SUCCESS_STOCKIN: {
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
        case DELETE_STOCKIN_SUCCESS: {
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
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const { _id, invoiceNumStockIn, vendor_name, stockInDetail } =
                subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                invoiceNumStockIn,
                vendor_name,
                stockInDetail,
            }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_STOCKIN_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_STOCKIN: {
            const initialState = {
                clearValues: '',
                _id: '',
                invoiceNumStockIn: '',
                vendor_name: '',
                stockInDetail: '',
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
export default WareHouseReducer
