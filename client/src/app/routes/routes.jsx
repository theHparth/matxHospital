import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import hospitalRoutes from 'app/views/hospital/HospitalRoutes'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import vendorRoutes from 'app/views/vendor/VendorRoutes'
import stockRoutes from 'app/views/stock/StockRoutes'
import wereHouseRoutes from 'app/views/wareHouse/WereHouseRoutes'
import stockOutRoutes from 'app/views/stockOut/StockOutRoutes'

export const AllPages = () => {
    const user = localStorage.getItem('user')

    // const hospital = localttorage.getItem('hospital')
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: user
                ? [
                      ...dashboardRoutes,
                      ...hospitalRoutes,
                      ...vendorRoutes,
                      ...stockRoutes,
                      ...wereHouseRoutes,
                      ...stockOutRoutes,
                      ...chartsRoute,
                      ...materialRoutes,
                  ]
                : [...dashboardRoutes, ...materialRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
