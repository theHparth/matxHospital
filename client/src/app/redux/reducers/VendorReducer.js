import {
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_BEGIN,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES,
    HANDLE_CHANGE,
    CLEAR_VENDOR_ALERT,
    DISPLAY_VENDOR_ALERT,
} from '../actions/VendorActions'

const initialState = {
    vendorData: [],
    isLoading: false,
    showAlert: true,
    alertType: '',
    alertText: '',
    isEditing: false,
    fname: '',
    address: '',
    contect: '',
    email: '',
    pincode: '',
}

const VendorReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS: {
            return {
                ...state,
                vendorData: action.payload.vendorList,
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
                alertText: 'Vendor Updated!',
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
            return { ...state, isLoading: true }
        }
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const { _id, address, pincode, contect, email, fname, password } =
                subscriber
            return {
                ...state,
                isEditing: true,
                _id,
                address,
                pincode,
                contect,
                email,
                fname,
                password,
            }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_VENDOR_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES: {
            const initialState = {
                fname: '',
                address: '',
                contect: '',
                password: '',
                email: '',
                pincode: '',
            }
            return {
                ...state,
                ...initialState,
            }
        }
        case DISPLAY_VENDOR_ALERT: {
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

export default VendorReducer
