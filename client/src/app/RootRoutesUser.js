import React from 'react'
import { Redirect } from 'react-router-dom'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import userStockIn from './views/userStockIn/StockInUserRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...userStockIn,
    ...materialRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
