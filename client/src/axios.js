import axios from 'axios'

// const axiosInstance = axios.create()
const authFetch = axios.create({
    baseURL: 'http://localhost:5000',
})
authFetch.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${JSON.parse(
            localStorage.getItem('token')
        )}`
        var aaa = localStorage.getItem('token')
        log(aaa)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// // authFetch.interceptors.response.use(
// //     (response) => {
// //         return response
// //     },
// //     (error) => {
// //         // console.log(error.response)
// //         if (error.response.status === 401) {
// //             logout()
// //         }
// //         return Promise.reject(error)
// //     }
// // )

// // const getHospitals = 'http://localhost:5000/api/v1/'

// export const getHospitalsUrl = () => authFetch('/v1/hospitals')

// // axiosInstance.interceptors.response.use(
// //     (response) => response,
// //     (error) =>
// //         Promise.reject(
// //             (error.response && error.response.data) || 'Something went wrong!'
// //         )
// // )

// // export default axiosInstance

// // import axios from 'axios'

// // const axiosInstance = axios.create()

// // axiosInstance.interceptors.req.use((req) => {
// //     if(localStorage.getItem('token')){
// //         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
// //     }
// // }
// //     // (error) =>
// //     //     Promise.reject(
// //     //         (error.response && error.response.data) || 'Something went wrong!'
// //     //     )

// // export default axiosInstance
