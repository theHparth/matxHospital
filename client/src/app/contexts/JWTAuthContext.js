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
    isHospital: false,
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
            const { isHospital } = action.payload
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                hospital: null,
                tokenHospital: null,
                isHospital,
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
    updateAdmin: () => Promise.resolve(),
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

    // for update requests
    const authFetchUpdate = axios.create({
        baseURL: '/api/v1',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    ///

    const addUserToLocalStorage = ({
        user,
        token,
        hospital,
        tokenHospital,
    }) => {
        if (user) {
            console.log('in user side')
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        } else {
            console.log('in hospital side')
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
            console.log(token, user)

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
            console.log(tokenHospital, hospital)
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

    const updateAdmin = async (state) => {
        console.log('in update frontened')
        try {
            const {
                name,
                lastName,
                address,
                pincode,
                contect,
                email,
                password,
            } = state
            const response = await authFetchUpdate.patch('/auth/updateUser', {
                name,
                lastName,
                address,
                pincode,
                contect,
                email,
                password,
            })
            const { token, user } = response.data
            removeUserFromLocalStorage()
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
        let isHospital = false
        if (localStorage.getItem('hospital')) {
            isHospital = true
        }
        removeUserFromLocalStorage()
        dispatch({ type: 'LOGOUT', payload: { isHospital: isHospital } })
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
                updateAdmin,
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

// import React, { createContext, useEffect, useReducer } from 'react'
// import jwtDecode from 'jwt-decode'
// import axios from 'axios.js'
// import { MatxLoading } from 'app/components'

// const initialState = {
//     isAuthenticated: false,
//     isInitialised: false,
//     user: null,
// }

// const isValidToken = (accessToken) => {
//     if (!accessToken) {
//         return false
//     }

//     const decodedToken = jwtDecode(accessToken)
//     const currentTime = Date.now() / 1000
//     return decodedToken.exp > currentTime
// }

// const setSession = (accessToken) => {
//     if (accessToken) {
//         localStorage.setItem('accessToken', accessToken)
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
//     } else {
//         localStorage.removeItem('accessToken')
//         delete axios.defaults.headers.common.Authorization
//     }
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'INIT': {
//             const { isAuthenticated, user } = action.payload

//             return {
//                 ...state,
//                 isAuthenticated,
//                 isInitialised: true,
//                 user,
//             }
//         }
//         case 'LOGIN': {
//             const { user } = action.payload

//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 user,
//             }
//         }
//         case 'LOGOUT': {
//             return {
//                 ...state,
//                 isAuthenticated: false,
//                 user: null,
//             }
//         }
//         case 'REGISTER': {
//             const { user } = action.payload

//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 user,
//             }
//         }
//         default: {
//             return { ...state }
//         }
//     }
// }

// const AuthContext = createContext({
//     ...initialState,
//     method: 'JWT',
//     login: () => Promise.resolve(),
//     logout: () => {},
//     register: () => Promise.resolve(),
// })

// export const AuthProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState)

//     const login = async (email, password) => {
//         console.log('testjskjslj')
//         const response = await axios.post('/api/auth/login', {
//             email,
//             password,
//         })
//         const { accessToken, user } = response.data

//         setSession(accessToken)

//         dispatch({
//             type: 'LOGIN',
//             payload: {
//                 user,
//             },
//         })
//     }

//     const register = async (email, username, password) => {
//         const response = await axios.post('/api/auth/register', {
//             email,
//             username,
//             password,
//         })

//         const { accessToken, user } = response.data

//         setSession(accessToken)

//         dispatch({
//             type: 'REGISTER',
//             payload: {
//                 user,
//             },
//         })
//     }

//     const logout = () => {
//         setSession(null)
//         dispatch({ type: 'LOGOUT' })
//     }

//     useEffect(() => {
//         ;(async () => {
//             try {
//                 const accessToken = window.localStorage.getItem('accessToken')

//                 if (accessToken && isValidToken(accessToken)) {
//                     setSession(accessToken)
//                     const response = await axios.get('/api/auth/profile')
//                     const { user } = response.data

//                     dispatch({
//                         type: 'INIT',
//                         payload: {
//                             isAuthenticated: true,
//                             user,
//                         },
//                     })
//                 } else {
//                     dispatch({
//                         type: 'INIT',
//                         payload: {
//                             isAuthenticated: false,
//                             user: null,
//                         },
//                     })
//                 }
//             } catch (err) {
//                 console.error(err)
//                 dispatch({
//                     type: 'INIT',
//                     payload: {
//                         isAuthenticated: false,
//                         user: null,
//                     },
//                 })
//             }
//         })()
//     }, [])

//     if (!state.isInitialised) {
//         return <MatxLoading />
//     }

//     return (
//         <AuthContext.Provider
//             value={{
//                 ...state,
//                 method: 'JWT',
//                 login,
//                 logout,
//                 register,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext
