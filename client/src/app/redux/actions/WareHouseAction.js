import axios from 'axios'

export const CREATE_BEGIN = 'CREATE_BEGIN'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS = 'GET_SUCCESS'
export const SET_EDIT = 'SET_EDIT'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

const add = (state) => async (dispatch) => {
    try {
        let {
            vendor_name,
            priceType,
            price,
            qty,
            box,
            stock_name,
            stockTotoalPrice,
        } = state
        price = priceType === 'individualPrice' ? price * box * qty : price
        await authFetch.post('/wereHouse', {
            vendor_name,
            price,
            totalQtyInOneBox: qty,
            totalBox: box,
            stock_name,
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

const getAllData = (state) => async (dispatch) => {
    try {
        const { data } = await authFetch.get('/wereHouse')
        const { stockList } = data
        console.log(stockList)
        dispatch({
            type: GET_SUCCESS,
            payload: { stockList },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    console.log(subscriber, 'new Data')
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    try {
        const {
            vendor_name,
            price,
            qty,
            box,
            stock_name,
            id,
            stockTotoalPrice,
        } = state
        await authFetch.patch(`/wereHouse/${id}`, {
            vendor_name,
            price,
            qty,
            box,
            stock_name,
            stockTotoalPrice,
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

// delete the
const deleteData = (Id) => async (dispatch) => {
    dispatch({ type: DELETE_BEGIN })
    // const { logout } = useAuth()
    try {
        await authFetch.delete(`/wereHouse/${Id}`)
        dispatch(getAllData())
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
    clearValues,
    clearAlert,
    displayAlert,
    getAllData,
    add,
    setEditData,
    edit,
    deleteData,
}
