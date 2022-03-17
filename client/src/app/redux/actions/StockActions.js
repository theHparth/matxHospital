import axios from 'axios'

export const CREATE_BEGIN = 'CREATE_BEGIN'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

const add = (state) => async (dispatch) => {
    try {
        const { description, vendor_name, vendor_id, price, qty } = state
        await authFetch.post('/stocks', {
            description,
            vendor_name,
            vendor_id,
            price,
            qty,
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

const getAllData = (state) => async (dispatch) => {}

const handleDataChange =
    ({ name, value }) =>
    (dispatch) => {}

const setEditData = (subscriber) => (dispatch) => {}

const edit = (state) => async (dispatch) => {}

// delete the
const deleteData = (Id) => async (dispatch) => {}

///////////////////////////////////////////////////////////////
const clearValues = () => (dispatch) => {}
const clearAlert = () => (dispatch) => {}
const displayAlert = () => (dispatch) => {}
////////////////////////////////////////////////////////////////////////

export {
    clearValues,
    clearAlert,
    displayAlert,
    getAllData,
    add,
    handleDataChange,
    setEditData,
    edit,
    deleteData,
}
