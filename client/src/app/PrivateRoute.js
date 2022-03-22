import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const privateRoute = ({ children, ...rest }) => {
    const role = 'user'
    return (
        <Route
            render={() => (role === 'user' ? children : <Redirect to="*" />)}
        />
    )
}

export default privateRoute
