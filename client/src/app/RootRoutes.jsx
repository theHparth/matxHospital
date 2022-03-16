import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import hospitalRoutes from './views/hospital/HospitalRoutes'
import vendorRoutes from './views/vendor/VendorRoutes'

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
    ...hospitalRoutes,
    ...vendorRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
