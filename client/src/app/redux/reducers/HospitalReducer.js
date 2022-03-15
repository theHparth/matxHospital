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
} from '../actions/HospitalActions'

const initialState = { hospitals: [], totalHospitals: 0, numOfPages: 0 }
const HospitalReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_HOSPITAL_SUCCESS: {
            return {
                ...state,
                hospitals: action.payload.hospitals,
                totalHospitals: action.payload.totalHospitals,
                numOfPages: action.payload.numOfPages,
            }
        }
        // case GET_CATEGORY_LIST: {
        //     return {
        //         ...state,
        //         categoryList: [...action.payload],
        //     }
        // }
        // case GET_RATING_LIST: {
        //     return {
        //         ...state,
        //         ratingList: [...action.payload],
        //     }
        // }
        // case GET_BRAND_LIST: {
        //     return {
        //         ...state,
        //         brandList: [...action.payload],
        //     }
        // }
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
        // case DELETE_PRODUCT_FROM_CART: {
        //     return {
        //         ...state,
        //         cartList: [...action.payload],
        //     }
        // }
        // case UPDATE_CART_AMOUNT: {
        //     return {
        //         ...state,
        //         cartList: [...action.payload],
        //     }
        // }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default HospitalReducer
