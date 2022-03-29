import axios from 'axios'

export const UPDATE_HOSPITAL_BEGIN = 'UPDATE_HOSPITAL_BEGIN'
export const UPDATE_HOSPITAL_SUCCESS = 'UPDATE_HOSPITAL_SUCCESS'
export const UPDATE_HOSPITAL_ERROR = 'UPDATE_HOSPITAL_ERROR'
export const CLEAR_VALUES_HOSPITAL = 'CLEAR_VALUES_HOSPITAL'
export const CREATE_HOSPITAL_BEGIN = 'CREATE_HOSPITAL_BEGIN'
export const CREATE_HOSPITAL_SUCCESS = 'CREATE_HOSPITAL_SUCCESS'
export const CREATE_HOSPITAL_ERROR = 'CREATE_HOSPITAL_ERROR'
export const GET_HOSPITAL_BEGIN = 'GET_HOSPITAL_BEGIN'
export const GET_HOSPITAL_SUCCESS = 'GET_HOSPITAL_SUCCESS'
export const SET_EDIT_HOSPITAL = 'SET_EDIT_HOSPITAL'
export const DELETE_HOSPITAL_BEGIN = 'DELETE_HOSPITAL_BEGIN'
export const EDIT_HOSPITAL_BEGIN = 'EDIT_HOSPITAL_BEGIN'
export const EDIT_HOSPITAL_SUCCESS = 'EDIT_HOSPITAL_SUCCESS'
export const EDIT_HOSPITAL_ERROR = 'EDIT_HOSPITAL_ERROR'
export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN'
export const GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS =
    'GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_ALERT = 'CLEAR_ALERT'
export const DISPLAY_ALERT = ' DISPLAY_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

///////////////////////////////////////////////////////////////
const clearValue = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_HOSPITAL })
}
const clearAlert = () => (dispatch) => {
    // setTimeout(() => {
    //     dispatch({ type: CLEAR_ALERT })
    // }, 3000)
}
const displayAlert = () => (dispatch) => {
    dispatch({ type: DISPLAY_ALERT })
    // dispatch(clearAlert())
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

////////////////////////////////////////////////////////////////////////

const getHospitalsData = (hospitalId) => async (dispatch) => {
    let url = '/hospitals'
    if (hospitalId) {
        url = url + `?hospitalId=${hospitalId}`
    }
    try {
        const { data } = await authFetch.get(url)
        const { hospitals } = data
        dispatch({
            type: GET_HOSPITAL_SUCCESS,
            payload: { hospitals },
        })
    } catch (error) {
        console.log(error)
    }
    // dispatch(clearAlert())
}
const hospitalStockInformation = (id) => async (dispatch) => {
    let url = `/hospitalDataAdmin?id=${id}`

    dispatch({ type: GET_HOSPITAL_BEGIN })
    try {
        const { data } = await authFetch.get(url)
        const { hospitalPresentStock } = data
        dispatch({
            type: GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS,
            payload: { hospitalPresentStock },
        })
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
}

const addHospital = (state) => async (dispatch) => {
    try {
        const {
            address,
            pincode,
            contect,
            email,
            username,
            password,
            hospitalName,
        } = state
        await authFetch.post('/hospitals', {
            address,
            pincode,
            contect,
            email,
            username,
            password,
            hospitalName,
        })
        dispatch({ type: CREATE_HOSPITAL_SUCCESS })
        dispatch({ type: CLEAR_VALUES_HOSPITAL })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
}

const handleHospitalChange =
    ({ name, value }) =>
    (dispatch) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }

const setEditHospital = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT_HOSPITAL, payload: { subscriber } })
}

const editHospital = (state) => async (dispatch) => {
    dispatch({ type: EDIT_HOSPITAL_BEGIN })
    try {
        const { address, pincode, contect, email, username, id, hospitalName } =
            state
        await authFetch.patch(`/hospitals/${id}`, {
            address,
            pincode,
            contect,
            email,
            username,
            hospitalName,
        })
        dispatch({ type: EDIT_HOSPITAL_SUCCESS })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
}

// delete the
const deleteHospital = (hospitalId) => async (dispatch) => {
    dispatch({ type: DELETE_HOSPITAL_BEGIN })
    console.log('deleted')
    try {
        await authFetch.delete(`/hospitals/${hospitalId}`)
        dispatch(getHospitalsData())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
}

export {
    clearValue,
    clearAlert,
    displayAlert,
    getHospitalsData,
    addHospital,
    handleHospitalChange,
    setEditHospital,
    editHospital,
    deleteHospital,
    hospitalStockInformation,
}
