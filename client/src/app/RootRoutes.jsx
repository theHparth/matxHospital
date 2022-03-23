import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import hospitalRoutes from './views/hospital/HospitalRoutes'
import vendorRoutes from './views/vendor/VendorRoutes'
import stockRoutes from './views/stock/StockRoutes'
import wereHouseRoutes from './views/wareHouse/WereHouseRoutes'
import stockOutRoutes from './views/stockOut/StockOutRoutes'

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
    ...stockRoutes,
    ...wereHouseRoutes,
    ...stockOutRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
