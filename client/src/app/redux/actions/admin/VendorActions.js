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
export const CLEAR_VALUES_VENDOR = 'CLEAR_VALUES_VENDOR'
export const CLEAR_VENDOR_ALERT = 'CLEAR_ALERT'
export const DISPLAY_VENDOR_ALERT = ' DISPLAY_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

///////////////////////////////////////////////////////////////
const clearValue = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_VENDOR })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_VENDOR_ALERT })
    }, 3000)
}
const displayAlert = () => (dispatch) => {
    dispatch({ type: DISPLAY_VENDOR_ALERT })
    dispatch(clearAlert())
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
////////////////////////////////////////////////////////////////////////

const getAllVendor = (state) => async (dispatch) => {
    try {
        const { data } = await authFetch.get('/vendors')
        const { vendorList } = data
        console.log('vendor list', vendorList)

        dispatch({
            type: GET_SUCCESS,
            payload: { vendorList },
        })
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
}

const add = (state) => async (dispatch) => {
    try {
        const { address, pincode, contect, email, vendor_name } = state

        await authFetch.post('/vendors', {
            address,
            pincode,
            contect,
            email,
            vendor_name,
        })
        dispatch({ type: CREATE_SUCCESS })
        dispatch({ type: CLEAR_VALUES_VENDOR })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

const handleDataChange =
    ({ name, value }) =>
    (dispatch) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }

const setEditData = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    try {
        const { address, pincode, contect, email, vendor_name, id } = state
        await authFetch.patch(`/vendors/${id}`, {
            address,
            pincode,
            contect,
            email,
            vendor_name,
        })
        dispatch({ type: EDIT_SUCCESS })
        dispatch({ type: CLEAR_VALUES_VENDOR })
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
        await authFetch.delete(`/vendors/${Id}`)
        dispatch(getAllVendor())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
}

export {
    clearValue,
    clearAlert,
    displayAlert,
    getAllVendor,
    add,
    handleDataChange,
    setEditData,
    edit,
    deleteData,
}
