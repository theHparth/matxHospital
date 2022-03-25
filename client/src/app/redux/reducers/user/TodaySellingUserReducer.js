import {
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_TODAY_SELLING,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_BEGIN,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES,
    HANDLE_CHANGE,
    CLEAR_STOCK_ALERT,
    DISPLAY_STOCK_ALERT,
} from '../../actions/user/TodaySellingUserAction'

const initialState = {
    todaySellingData: [],
    isLoading: false,
    showAlert: true,
    alertType: '',
    alertText: '',
    isEditing: false,
    stock_name: '',
    totalQtyInOneBox: 1,
    totalBox: 1,
    userPrice: 1,
}

const WareHouseReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS_TODAY_SELLING: {
            return {
                ...state,
                todaySellingData: action.payload.stockListTodaySelling,
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
                alertText: 'New Stock data Added!',
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
            }
        }
        // edit VENDOR
        case EDIT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Stock data updated successfully',
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
        //delete state
        case DELETE_BEGIN: {
            return { ...state, isLoading: false }
        }
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const { _id, stock_name, totalQtyInOneBox, totalBox, userPrice } =
                subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                stock_name,
                totalQtyInOneBox,
                totalBox,
                userPrice,
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
export default WareHouseReducer
