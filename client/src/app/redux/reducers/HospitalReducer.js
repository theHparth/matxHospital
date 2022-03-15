import {
    UPDATE_HOSPITAL_BEGIN,
    UPDATE_HOSPITAL_SUCCESS,
    UPDATE_HOSPITAL_ERROR,
    CLEAR_VALUES_HOSPITAL,
    CREATE_HOSPITAL_BEGIN,
    CREATE_HOSPITAL_SUCCESS,
    CREATE_HOSPITAL_ERROR,
    GET_HOSPITAL_BEGIN,
    GET_HOSPITAL_SUCCESS,
    SET_EDIT_HOSPITAL,
    DELETE_HOSPITAL_BEGIN,
    EDIT_HOSPITAL_BEGIN,
    EDIT_HOSPITAL_SUCCESS,
    EDIT_HOSPITAL_ERROR,
    SHOW_STATS_BEGIN,
    HANDLE_CHANGE,
    CLEAR_ALERT,
    DISPLAY_ALERT,
} from '../actions/HospitalActions'

const initialState = {
    hospitalsData: [],
    isLoading: false,
    showAlert: true,
    alertType: '',
    alertText: '',
    isEditing: false,
    username: '',
    address: '',
    contect: '',
    password: '',
    email: '',
    pincode: '',
}
const HospitalReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_HOSPITAL_SUCCESS: {
            return {
                ...state,
                hospitalsData: action.payload.hospitals,
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
                alertType: 'danger',
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
            return { ...state, isLoading: true }
        }
        case SET_EDIT_HOSPITAL: {
            // const hospitalN = state.hospitals.find(
            //     (hospital) => hospital._id === action.payload.id
            // )
            const subscriber = {action.payload.subscriber}
            const {
                _id,
                address,
                pincode,
                contect,
                email,
                username,
                password,
            } = subscriber
            return {
                ...state,
                isEditing: true,
                _id,address,
                pincode,
                contect,
                email,
                username,
                password,
            }
        }

        // case GET_CART_LIST: {
        //     return {
        //         ...state,
        //         cartList: [...action.payload],
        //     }
        // }
        // case ADD_PRODUCT_TO_CART: {
        //     return {
        //         ...state,
        //         cartList: [...action.payload],
        //     }
        // }
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
                isEditing: false,
                username: '',
                address: '',
                contect: '',
                password: '',
                confirmPassword: '',
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
