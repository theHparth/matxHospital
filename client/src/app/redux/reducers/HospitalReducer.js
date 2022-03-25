import {
    CLEAR_VALUES,
    CREATE_HOSPITAL_BEGIN,
    CREATE_HOSPITAL_SUCCESS,
    CREATE_HOSPITAL_ERROR,
    GET_HOSPITAL_SUCCESS,
    SET_EDIT_HOSPITAL,
    DELETE_HOSPITAL_BEGIN,
    EDIT_HOSPITAL_BEGIN,
    EDIT_HOSPITAL_SUCCESS,
    EDIT_HOSPITAL_ERROR,
    HANDLE_CHANGE,
    CLEAR_ALERT,
    DISPLAY_ALERT,
    CLEAR_VALUES_HOSPITAL,
    GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS,
} from '../actions/HospitalActions'

const initialState = {
    hospitalsData: [],
    hospitalIndividualStockData: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
    hospitalName: '',
    address: '',
    contect: '',
    password: '',
    email: '',
    pincode: '',
    _id: '',
}
const HospitalReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_HOSPITAL_SUCCESS: {
            return {
                ...state,
                hospitalsData: action.payload.hospitals,
            }
        }
        case GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS: {
            return {
                ...state,
                hospitalIndividualStockData:
                    action.payload.hospitalPresentStock,
            }
        }
        case CREATE_HOSPITAL_BEGIN: {
            return { ...state, isLoading: true }
        }

        case CREATE_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Hoapital Added!',
            }
        }
        case CREATE_HOSPITAL_ERROR: {
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
        case EDIT_HOSPITAL_BEGIN: {
            return {
                ...state,
                isLoading: true,
            }
        }
        // edit hospital
        case EDIT_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Hospital Updated!',
                _id: '',
            }
        }
        case EDIT_HOSPITAL_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'danger',
            }
        }
        //delete state
        case DELETE_HOSPITAL_BEGIN: {
            return { ...state, isLoading: false }
        }
        case SET_EDIT_HOSPITAL: {
            const subscriber = action.payload.subscriber
            const {
                _id,
                address,
                pincode,
                contect,
                email,
                username,
                password,
                hospitalName,
            } = subscriber
            return {
                ...state,
                isEditing: true,
                _id,
                address,
                pincode,
                contect,
                email,
                username,
                password,
                hospitalName,
            }
        }

        /////////////////////////////////////////////////////////
        case CLEAR_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_HOSPITAL: {
            const initialState = {
                hospitalName: '',
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
        case DISPLAY_ALERT: {
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

export default HospitalReducer
