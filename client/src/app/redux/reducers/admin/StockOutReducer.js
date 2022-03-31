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
    GET_ALL_SUCCESS_STOCKOUT,
} from '../../actions/admin/StockOutAction'

const initialState = {
    stockOutDataTrue: [],
    stockOutDataFalse: [],
    allStockOutData: [],
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
    price: 0,
    priceForUser: 0,
    status: false,
    showPrice: false,
    invoiceNum: 0,
    stockOutDetail: [],
    createdFor: '',
    createdAt: '',
    latestStatus: '',
    updatedAt: '',
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
        case GET_ALL_SUCCESS_STOCKOUT: {
            return { ...state, allStockOutData: action.payload.allStockOutData }
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
                invoiceNum,
                stockOutDetail,
                createdFor,
                createdAt,
                status,
                updatedAt,
            } = subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                hospitalName,
                invoiceNum,
                stockOutDetail,
                createdFor,
                createdAt,
                updatedAt,
                latestStatus: status,
            }
        }

        case DELETE_BEGIN: {
            return { ...state, isLoading: false }
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
