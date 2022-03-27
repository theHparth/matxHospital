import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import hospitalRoutes from 'app/views/hospital/HospitalRoutes'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import dashboardRoutesUser from 'app/views/userDashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import vendorRoutes from 'app/views/vendor/VendorRoutes'
import stockRoutes from 'app/views/stock/StockRoutes'
import wereHouseRoutes from 'app/views/wareHouse/WereHouseRoutes'
import stockOutRoutes from 'app/views/stockOut/StockOutRoutes'
import StockInUserRoutes from 'app/views/userStockIn/StockInUserRoutes'

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
                      ...materialRoutes,
                  ]
                : [
                      ...dashboardRoutesUser,
                      ...materialRoutes,
                      ...StockInUserRoutes,
                  ],
        },
        ...sessionRoutes,
        user
            ? {
                  path: '/',
                  element: <Navigate to="dashboard/default" />,
              }
            : {
                  path: '/',
                  element: <Navigate to="/user/dashboard/default" />,
              },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
