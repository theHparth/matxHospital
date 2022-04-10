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
export const GET_ALL_SUCCESS_STOCKOUT = 'GET_ALL_SUCCESS_STOCKOUT'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1/stockOut',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

const sendToUser = (state) => async (dispatch) => {
    try {
        let { hospitalName, stockOutDetail, messageForHospital } = state
        await authFetch.post('/', {
            hospitalName,
            stockOutDetail,
            messageForHospital,
        })
        dispatch({ type: CREATE_SUCCESS })
        dispatch(clearValues())
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    // console.log(subscriber, 'new Data')
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    try {
        const { id, hospitalName, invoiceNum, stockOutDetail } = state
        await authFetch.patch(`/wereHouse/${id}`, {
            id,
            hospitalName,
            invoiceNum,
            stockOutDetail,
        })
        dispatch({ type: EDIT_SUCCESS })
        dispatch(clearValues())
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

const allStockOutDatas = (state) => async (dispatch) => {
    const { new_dates, searchText, id, searchStatus } = state

    let url = `/?searchStatus=${searchStatus}`

    if (id) {
        url = url + `&hospitalId=${id}`
    }
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    if (new_dates[0] != undefined) {
        console.log('first search date', new_dates[0])
        url = url + `&startDate=${new_dates[0]}&endDate=${new_dates[1]}`
    }

    try {
        const { data } = await authFetch.get(url)
        const { allStockOutData } = data

        dispatch({
            type: GET_ALL_SUCCESS_STOCKOUT,
            payload: { allStockOutData },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
}

const getAllSortData = (state) => async (dispatch) => {
    let url = '/sortData'
    var { searchDate, searchText, id } = state
    if (id) {
        url = url + `?hospitalId=${id}`
    }
    try {
        const { data } = await authFetch.post(url, {
            searchDate,
        })
        const { allStockOutData } = data
        console.log('in frontenddddd', allStockOutData)
        dispatch({
            type: GET_ALL_SUCCESS_STOCKOUT,
            payload: { allStockOutData },
        })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    // dispatch(clearAlert())
}
const filterDataCalculation = (state) => async (dispatch) => {}

const deleteData = (Id) => async (dispatch) => {
    dispatch({ type: DELETE_BEGIN })
    // const { logout } = useAuth()
    try {
        await authFetch.delete(`/${Id}`)
        dispatch(allStockOutDatas())
    } catch (error) {
        // logout()
        console.log(error)
    }
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
    getAllSortData,
    sendToUser,
    filterDataCalculation,
    edit,
    setEditData,
    deleteData,
    clearValues,
    clearAlert,
    displayAlert,
    allStockOutDatas,
}
