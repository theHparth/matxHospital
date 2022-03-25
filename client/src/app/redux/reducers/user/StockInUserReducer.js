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
    STATUS_EDIT_SUCCESS,
    CLEAR_STOCK_ALERT,
    DISPLAY_STOCK_ALERT,
    SET_EDIT_MINIMUM_LIMIT,
    GET_SUCCESS_PRESENT_STOCK,
} from '../../actions/user/StockInUserAction'

const initialState = {
    stockInDataTrue: [],
    stockInDataFalse: [],
    presentStockUserData: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    // vendor_name: '',
    // vendor_id: '',
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
        case GET_SUCCESS_STOCKOUT_STATUS_TRUE: {
            return {
                ...state,
                stockInDataTrue: action.payload.stockInDataTrueStatus,
            }
        }
        case GET_SUCCESS_STOCKOUT_STATUS_FALSE: {
            return {
                ...state,
                stockInDataFalse: action.payload.stockInDataFalseStatus,
            }
        }
        case GET_SUCCESS_PRESENT_STOCK: {
            return {
                ...state,
                presentStockUserData: action.payload.presentStockUser,
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
        case STATUS_EDIT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                status: true,
                alertType: 'success',
                alertText: 'Minimum limit updated successfully',
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
        // case CREATE_BEGIN: {
        //     return { ...state, isLoading: true }
        // }

        // case CREATE_SUCCESS: {
        //     return {
        //         ...state,
        //         isLoading: false,
        //         showAlert: true,
        //         alertType: 'success',
        //         alertText: 'New Stock data Added!',
        //     }
        // }
        // case CREATE_ERROR: {
        //     return {
        //         ...state,
        //         isLoading: false,
        //         showAlert: true,
        //         alertType: 'warning',
        //         alertText: action.payload.msg,
        //     }
        // }
        // case HANDLE_CHANGE: {
        //     return {
        //         ...state,
        //         page: 1,
        //         [action.payload.name]: action.payload.value,
        //     }
        // }
        // case EDIT_BEGIN: {
        //     return {
        //         ...state,
        //         isLoading: true,
        //     }
        // }
        // // edit VENDOR
        // case EDIT_SUCCESS: {
        //     return {
        //         ...state,
        //         isLoading: false,
        //         showAlert: true,
        //         alertType: 'success',
        //         alertText: 'Stock data updated successfully',
        //     }
        // }
        // case EDIT_ERROR: {
        //     return {
        //         ...state,
        //         isLoading: false,
        //         showAlert: true,
        //         alertText: action.payload.msg,
        //         alertType: 'danger',
        //     }
        // }
        //delete state
        case DELETE_BEGIN: {
            return { ...state, isLoading: false }
        }
        // case SET_EDIT: {
        //     const subscriber = action.payload.subscriber
        //     const { _id, description, minimumLimit, stock_name } = subscriber

        //     return {
        //         ...state,
        //         isEditing: true,
        //         _id,
        //         description,
        //         minimumLimit,
        //         stock_name,
        //     }
        // }

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
export default StockInUserReducer
