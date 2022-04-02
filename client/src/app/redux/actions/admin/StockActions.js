import axios from 'axios'

export const CREATE_BEGIN = 'CREATE_BEGIN'
export const CREATE_SUCCESS_STOCK = 'CREATE_SUCCESS_STOCK'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS_STOCK = 'GET_SUCCESS_STOCK'
export const SET_EDIT = 'SET_EDIT'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES_STOCK = 'CLEAR_VALUES_STOCK'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

const add = (state) => async (dispatch) => {
    try {
        var { description, stock_name, minimumLimit } = state

        await authFetch.post('/stocks', {
            description,
            stock_name,
            minimumLimit,
        })
        dispatch({ type: CREATE_SUCCESS_STOCK })
        // dispatch({ type: CLEAR_VALUES_STOCK })
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
        const { data } = await authFetch.get('/stocks')
        const { stockList } = data
        dispatch({
            type: GET_SUCCESS_STOCK,
            payload: { stockList },
        })
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    try {
        const { description, id, stock_name, minimumLimit } = state
        await authFetch.patch(`/stocks/${id}`, {
            description,
            minimumLimit,
            stock_name,
        })
        dispatch({ type: EDIT_SUCCESS })
        // dispatch({ type: CLEAR_VALUES_STOCK })
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

    try {
        await authFetch.delete(`/stocks/${Id}`)
        dispatch(getAllData())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
}

///////////////////////////////////////////////////////////////
const clearValueStock = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_STOCK })
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
    clearValueStock,
    clearAlert,
    displayAlert,
    getAllData,
    add,
    setEditData,
    edit,
    deleteData,
}
