import useAuth from 'app/hooks/useAuth'
import { flat } from 'app/utils/utils'
import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { AllPages } from '../routes/routes'
import { AllUserPages } from '../routes/routesUser'

const getUserRoleAuthStatus = (
    pathname,
    user,
    routes,
    hospital,
    routesHospital
) => {
    if (!user && !hospital) {
        return false
    }
    if (user) {
        const matched = routes.find((r) => r.path === pathname)
        const authenticated =
            matched && matched.auth && matched.auth.length
                ? matched.auth.includes(user)
                : true
        console.log(matched, user)
        return authenticated
    } else {
        const matched = routesHospital.find((r) => r.path === pathname)
        const authenticated =
            matched && matched.auth && matched.auth.length
                ? matched.auth.includes(hospital)
                : true
        console.log(matched, user)
        return authenticated
    }
}

const AuthGuard = ({ children }) => {
    const { isAuthenticated, user, hospital } = useAuth()

    // return <>{isAuthenticated ? children : <Navigate to="/session/signin" />}</>

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()
    const routes = flat(AllPages())
    const routesHospital = flat(AllUserPages())
    var isUserRoleAuthenticated
    if (user) {
        isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user, routes)
    } else {
        isUserRoleAuthenticated = getUserRoleAuthStatus(
            pathname,
            hospital,
            routesHospital
        )
    }
    let authenticated = isAuthenticated && isUserRoleAuthenticated

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE

    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to="/session/signin"
                state={{ redirectUrl: previouseRoute }}
            />
            // <Redirect
            //     to={{
            //         pathname: '/session/signin',
            //         state: { redirectUrl: previouseRoute },
            //     }}
            // />
        )
    }
}

export default AuthGuard
