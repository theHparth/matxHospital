import axios from 'axios'
import { useContext } from 'react'

import useAuth from 'app/hooks/useAuth'

import React from 'react'

function AuthApi() {
    const { user } = useAuth()
    return <div>authApi</div>
}

export default AuthApi

const getHospitals = 'http://localhost:3000/api/v1/hospitals'

export const getHospitalsUrl = () => axios.get(getHospitals)
