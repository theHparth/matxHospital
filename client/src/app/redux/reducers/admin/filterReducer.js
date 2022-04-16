import {
    GET_FILTER_SUCCESS,
    CLEAR_VALUES_STOCKOUT,
    GET_FILTER_BEGIN,
    CLEAR_STOCK_ALERT,
} from '../../actions/admin/filterAction'

const initialState = {
    filteredData: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
}

const StockOutReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_FILTER_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }

        case GET_FILTER_SUCCESS: {
            return { ...state, filteredData: action.payload.filterDataBack }
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
        case CLEAR_VALUES_STOCKOUT: {
            const initialState = {
                clearValues: '',
                _id: '',
                hospitalName: '',
                stockOutDetail: '',
                messageForHospital: '',
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
export default StockOutReducer
