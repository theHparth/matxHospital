import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const reducer = (state, action) => {
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
            const { user, token } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
                token,
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
    taoken: '',
    login: () => Promise.resolve(),
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
            if (error.response.status === 401) {
                logout()
            }
            return Promise.reject(error)
        }
    )

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
        // clearAlert()
    }

    const register = async (email, name, password) => {
        const response = await authFetch.post('/auth/register', {
            email,
            name,
            password,
        })

        const { token, user } = response.data

        addUserToLocalStorage({ user, token })

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        removeUserFromLocalStorage()
        dispatch({ type: 'LOGOUT' })
    }

    // const getAllHospital = async () => {
    //     const { response } = await authFetch('/hospitals')
    //     const { hospitals } = response.data
    //     return response.data
    // }
    //

    // ----------------------------------------------------------------
    useEffect(() => {
        ;(async () => {
            try {
                const token = window.localStorage.getItem('token')
                const user = window.localStorage.getItem('user')

                if (token && user) {
                    //addUserToLocalStorage({ user, token })
                    // const response = await authFetch.get('/auth/hospitals')
                    // const { user } = response.data
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
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
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
