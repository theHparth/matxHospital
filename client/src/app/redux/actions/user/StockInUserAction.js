import axios from 'axios'

export const CREATE_BEGIN = 'CREATE_BEGIN'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS_STOCKOUT_STATUS_TRUE =
    'GET_SUCCESS_STOCKOUT_STATUS_TRUE'
export const GET_SUCCESS_STOCKOUT_STATUS_FALSE =
    'GET_SUCCESS_STOCKOUT_STATUS_FALSE'
export const SET_EDIT = 'SET_EDIT'
export const SET_EDIT_MINIMUM_LIMIT = 'SET_EDIT_MINIMUM_LIMIT'
export const GET_SUCCESS_PRESENT_STOCK = 'GET_SUCCESS_PRESENT_STOCK'
export const STATUS_EDIT_SUCCESS = 'STATUS_EDIT_SUCCESS'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1/stocksUser',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenHospital')}`,
    },
})

const getAllDataStatusTrue = (state) => async (dispatch) => {
    try {
        const { data } = await authFetch.get('/trueUser')
        const { stockInDataTrueStatus } = data
        // console.log(stockList)
        dispatch({
            type: GET_SUCCESS_STOCKOUT_STATUS_TRUE,
            payload: { stockInDataTrueStatus },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}
const getAllDataStatusFalse = (state) => async (dispatch) => {
    try {
        const { data } = await authFetch.get('/falseUser')
        const { stockInDataFalseStatus } = data
        // console.log('userData', stockInDataFalseStatus)
        dispatch({
            type: GET_SUCCESS_STOCKOUT_STATUS_FALSE,
            payload: { stockInDataFalseStatus },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}
const inStockUser = (state) => async (dispatch) => {
    try {
        const { data } = await authFetch.get('/totalStocks')
        const { presentStockUser } = data
        console.log('presentstockdata', presentStockUser)
        dispatch({
            type: GET_SUCCESS_PRESENT_STOCK,
            payload: { presentStockUser },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}

const setEditMinimumLimit = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT_MINIMUM_LIMIT, payload: { subscriber } })
}

const inStockMinimumChange = (state) => async (dispatch) => {
    try {
        const { minimumLimit, id } = state
        await authFetch.patch(`/totalStocks/${id}`, {
            id,
            minimumLimit,
        })
        dispatch({ type: STATUS_EDIT_SUCCESS })
        dispatch(getAllDataStatusFalse())
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}
const statusChange = (id) => async (dispatch) => {
    try {
        // const { id } = state
        await authFetch.patch(`/status/${id}`, {
            id,
            status: true,
        })
        dispatch({ type: STATUS_EDIT_SUCCESS })
        dispatch(getAllDataStatusFalse())
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}
///////////////////////////////////////////////////////////////
const clearValues = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCK_ALERT })
    }, 3000)
}
const displayAlert = () => (dispatch) => {
    dispatch({ type: DISPLAY_STOCK_ALERT })
    dispatch(clearAlert())
}
////////////////////////////////////////////////////////////////////////

export {
    getAllDataStatusTrue,
    getAllDataStatusFalse,
    inStockUser,
    inStockMinimumChange,
    setEditMinimumLimit,
    statusChange,
    clearValues,
    clearAlert,
    displayAlert,
}
