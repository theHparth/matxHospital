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

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...dashboardRoutes,
                ...hospitalRoutes,
                ...vendorRoutes,
                ...stockRoutes,
                ...wereHouseRoutes,
                ...chartsRoute,
                ...materialRoutes,
            ],
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
