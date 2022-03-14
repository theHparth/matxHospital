import React, { createContext, useEffect, useContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import reducer from './reducer'

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
} from './actions'
// const initialState = {
//     isAuthenticated: false,
//     isInitialised: false,
//     user: null,
// }
const initialState = {
    method: 'JWT',
    // login: () => Promise.resolve(),
    // logout: () => {},
    // register: () => Promise.resolve(),
    // isAuthenticated: false,
    // isInitialised: false,
    // me

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
}

// const isValidToken = (accessToken) => {
//     if (!accessToken) {
//         return false
//     }

//     const decodedToken = jwtDecode(accessToken)
//     const currentTime = Date.now() / 1000
//     return decodedToken.exp > currentTime
// }

// const setSession = (accessToken, user) => {
//     if (accessToken && user) {
//         localStorage.setItem('accessToken', accessToken)
//         localStorage.setItem('user', user)
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
//     } else {
//         localStorage.removeItem('accessToken')
//         delete axios.defaults.headers.common.Authorization
//     }
// }

const reducerr = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

// const AuthContext = createContext({
//     ...initialState,

// })
const AppContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // response

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser
            )

            const { user, token, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText },
            })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        // clearAlert()
    }

    // const login = async (email, password) => {
    //     // const response = await axios.post('/api/auth/login', {
    //     //     email,
    //     //     password,
    //     // })
    //     // const { accessToken, user } = response.data

    //     // setSession(accessToken)

    //     const response = await axios.post('/api/v1/auth/login', {
    //         email,
    //         password,
    //     })
    //     const { accessToken, user } = response.data

    //     setSession(accessToken, user)

    //     dispatch({
    //         type: 'LOGIN',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    // const register = async (email, username, password) => {
    //     const response = await axios.post('/api/auth/register', {
    //         email,
    //         username,
    //         password,
    //     })

    //     const { accessToken, user } = response.data

    //     setSession(accessToken)

    //     dispatch({
    //         type: 'REGISTER',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    // useEffect(() => {
    //     ;(async () => {
    //         try {
    //             const accessToken = localStorage.getItem('accessToken')
    //             // const user = window.localStorage.getItem('user')

    //             if (accessToken && isValidToken(accessToken)) {
    //                 setSession(accessToken)
    //                 const response = await axios.get('/api/auth/profile')
    //                 const { user } = response.data

    //                 dispatch({
    //                     type: 'INIT',
    //                     payload: {
    //                         isAuthenticated: true,
    //                         user,
    //                     },
    //                 })
    //             } else {
    //                 dispatch({
    //                     type: 'INIT',
    //                     payload: {
    //                         isAuthenticated: false,
    //                         user: null,
    //                     },
    //                 })
    //             }
    //         } catch (err) {
    //             console.error(err)
    //             dispatch({
    //                 type: 'INIT',
    //                 payload: {
    //                     isAuthenticated: false,
    //                     user: null,
    //                 },
    //             })
    //         }
    //     })()
    // }, [])

    // if (!state.isInitialised) {
    //     return <MatxLoading />
    // }

    return (
        <AuthProvider.Provider
            value={{
                ...state,
                method: 'JWT',
                logoutUser,
                setupUser,
            }}
        >
            {children}
        </AuthProvider.Provider>
    )
}

// export default AuthContext

const useAppContext = () => {
    return useContext(AuthProvider)
}

export { AuthProvider, initialState, useAppContext }
