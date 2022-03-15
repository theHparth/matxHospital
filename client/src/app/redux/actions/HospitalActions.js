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

export const getHospitalsData = () => async (dispatch) => {
    // const { page, search } = state

    // let url = `/hospitals?page=${page}`
    // if (search) {
    //     url = url + `&search=${search}`
    // }
    // dispatch({ type: GET_HOSPITAL_BEGIN })
    try {
        const { data } = await authFetch.get('/hospitals')
        const { hospitals } = data
        dispatch({
            type: GET_HOSPITAL_SUCCESS,
            payload: { hospitals },
        })
    } catch (error) {
        console.log(error)
    }
}

export const addHospital = (state) => async (dispatch) => {
    //   dispatch({ type: CREATE_HOSPITAL_BEGIN })
    try {
        const { address, pincode, contect, email, username, password } = state
        await authFetch.post('/hospitals', {
            address,
            pincode,
            contect,
            email,
            username,
            password,
        })
        dispatch({ type: CREATE_HOSPITAL_SUCCESS })
        dispatch({ type: CLEAR_VALUES })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    clearAlert()
}

// export const handleHospitalChange =
//     ({ name, value }) =>
//     (dispatch) => {
//         dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
//     }

// edit hospital
export const setEditHospital = (subscriber) => (dispatch) => {
    console.log({ subscriber })
    console.log('-------------------------------------')
    dispatch({ type: SET_EDIT_HOSPITAL, payload: { subscriber } })
}

export const editHospital = async (state) => async (dispatch) => {
    dispatch({ type: EDIT_HOSPITAL_BEGIN })

    try {
        const { address, pincode, contect, email } = state
        await authFetch.patch(`/hospitals/${state.editHospitalId}`, {
            address,
            pincode,
            contect,
            email,
        })
        dispatch({ type: EDIT_HOSPITAL_SUCCESS })
        dispatch({ type: CLEAR_VALUES_HOSPITAL })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    clearAlert()
}

// delete the
export const deleteHospital = (hospitalId) => async (dispatch) => {
    dispatch({ type: DELETE_HOSPITAL_BEGIN })
    console.log('deleted')
    try {
        await authFetch.delete(`/hospitals/${hospitalId}`)
        getHospitalsData()
    } catch (error) {
        // logoutUser()
        console.log(error)
    }
}
///////////////////////////////////////////////////////////////
export const clearValues = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES })
}
export const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_ALERT })
    }, 3000)
}
export const displayAlert = () => (dispatch) => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
}
