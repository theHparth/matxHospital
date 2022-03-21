import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    token: null,
    hospital: null,
    tokenHospital: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user, hospital } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
                hospital,
            }
        }
        case 'LOGIN': {
            const { user, token, hospital, tokenHospital } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
                token,
                hospital,
                tokenHospital,
            }
        }
        case 'LOGIN_ERROR': {
            const { msg } = action.payload

            return {
                ...state,
                msg,
            }
        }

        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                hospital: null,
                tokenHospital: null,
            }
        }
        // case 'REGISTER': {
        //     const { user, token } = action.payload

        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user,
        //         token,
        //     }
        // }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    // taoken: '',

    login: () => Promise.resolve(),
    loginUser: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/v1',
    })
    // request

    authFetch.interceptors.request.use(
        (config) => {
            if (state.token) {
                config.headers.common['Authorization'] = `Bearer ${state.token}`
            } else {
                config.headers.common[
                    'Authorization'
                ] = `Bearer ${state.tokenHospital}`
            }
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
            if (error.response.status === 401) {
                logout()
            }
            return Promise.reject(error)
        }
    )

    const addUserToLocalStorage = ({
        user,
        token,
        hospital,
        tokenHospital,
    }) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        } else {
            localStorage.setItem('hospital', JSON.stringify(hospital))
            localStorage.setItem('tokenHospital', tokenHospital)
        }
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        localStorage.removeItem('tokenHospital')
        localStorage.removeItem('hospital')
    }

    const login = async (email, password) => {
        try {
            const response = await authFetch.post('/auth/login', {
                email,
                password,
            })

            const { token, user } = response.data

            addUserToLocalStorage({ user, token })

            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                    token,
                },
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: { msg: error.response.data.msg },
            })
        }
    }

    const loginUser = async (email, password) => {
        try {
            const response = await authFetch.post('/authHospital/login', {
                email,
                password,
            })

            const { tokenHospital, hospital } = response.data

            addUserToLocalStorage({ hospital, tokenHospital })

            dispatch({
                type: 'LOGIN',
                payload: {
                    hospital,
                    tokenHospital,
                },
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: { msg: error.response.data.msg },
            })
        }
        // clearAlert()
    }

    const register = async (email, name, password) => {
        // const response = await authFetch.post('/auth/register', {
        //     email,
        //     name,
        //     password,
        // })
        // const { token, user } = response.data
        // addUserToLocalStorage({ user, token })
        // dispatch({
        //     type: 'REGISTER',
        //     payload: {
        //         user,
        //     },
        // })
    }

    const logout = () => {
        removeUserFromLocalStorage()
        dispatch({ type: 'LOGOUT' })
    }

    // ----------------------------------------------------------------
    useEffect(() => {
        ;(async () => {
            try {
                const token = window.localStorage.getItem('token')
                const user = window.localStorage.getItem('user')
                const tokenHospital =
                    window.localStorage.getItem('tokenHospital')
                const hospital = window.localStorage.getItem('hospital')

                if (token && user) {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else if (tokenHospital && hospital) {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            hospital,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                            hospital: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                        hospital: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
