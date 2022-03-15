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

// const authFetch = axios.create({
//     baseURL: '/api/v1',
// })
const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

export const getHospitalsData = async (dispatch) => {
    // const { page, search } = state

    // let url = `/hospitals?page=${page}`
    // if (search) {
    //     url = url + `&search=${search}`
    // }
    // dispatch({ type: GET_HOSPITAL_BEGIN })
    try {
        const { data } = await authFetch.get('/hospitals')
        // console.log(data)
        const { hospitals, totalHospitals, numOfPages } = data
        console.log(hospitals)
        dispatch({
            type: GET_HOSPITAL_SUCCESS,
            payload: {
                hospitals,
                totalHospitals,
                numOfPages,
            },
        })
    } catch (error) {
        console.log(error)
        // logoutUser()
    }
    // clearAlert()
}
