import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import chatRoutes from 'app/views/chat-box/ChatRoutes'
import crudRoute from 'app/views/CRUD/CrudRoutes'
import formsRoutes from 'app/views/forms/FormsRoutes'
import ListRoute from 'app/views/list/ListRoute'
import mapRoutes from 'app/views/map/MapRoutes'
import pagesRoutes from 'app/views/pages/pagesRoutes'
import todoRoutes from 'app/views/todo/TodoRoutes'
import inboxRoute from 'app/views/inbox/InboxRoutes'
import pricingRoutes from 'app/views/pricing/PricingRoutes'
import invoiceRoutes from 'app/views/invoice/InvoioceRoutes'
import calendarRoutes from 'app/views/calendar/CalendarRoutes'
import ecommerceRoutes from 'app/views/ecommerce/EcommerceRoutes'
import dataTableRoutes from 'app/views/data-table/dataTableRoutes'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dragAndDropRoute from 'app/views/Drag&Drop/DragAndDropRoute'
import scrumBoardRoutes from 'app/views/scrum-board/ScrumBoardRoutes'
import pageLayoutRoutes from 'app/views/page-layouts/PageLayoutRoutees'
import { dashboardRoutes } from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
// admin
import profileRoutes from 'app/views/admin/profile/ProfileRoutes'
import hospitalRoutes from 'app/views/admin/hospital/HospitalRoutes'
import vendorRoutes from 'app/views/admin/vendor/VendorRoutes'
import stockRoutes from 'app/views/admin/stock/StockRoutes'
import wereHouseRoutes from 'app/views/admin/wareHouse/WereHouseRoutes'
import stockOutRoutes from 'app/views/admin/stockOut/StockOutRoutes'

// hospital routes
import HospitalSellingHandleRoutes from 'app/views/adminUserCreatedby/HospitalSellingHandle/HospitalSellingHandleRoutes'
import userDashboardRoutes from 'app/views/adminUserCreatedby/userDashboard/DashboardRoutes'
import userStockInRoutes from 'app/views/adminUserCreatedby/userStockIn/StockInUserRoutes'

export const AllPages = () => {
    const user = localStorage.getItem('user')
    // console.log('route', user)
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
                      // admin
                      ...profileRoutes,
                      ...hospitalRoutes,
                      ...vendorRoutes,
                      ...stockRoutes,
                      ...wereHouseRoutes,
                      ...stockOutRoutes,
                      // admin completed
                      ...calendarRoutes,
                      ...chartsRoute,
                      ...chatRoutes,
                      ...crudRoute,
                      ...dataTableRoutes,
                      ...dragAndDropRoute,
                      ...ecommerceRoutes,
                      ...formsRoutes,
                      ...invoiceRoutes,
                      ...ListRoute,
                      ...mapRoutes,
                      ...materialRoutes,
                      ...inboxRoute,
                      ...pageLayoutRoutes,
                      ...pagesRoutes,
                      ...pricingRoutes,
                      ...scrumBoardRoutes,
                      ...todoRoutes,
                  ]
                : [
                      //hospitals
                      ...HospitalSellingHandleRoutes,
                      ...userDashboardRoutes,
                      ...userStockInRoutes,
                  ],
        },
        ...sessionRoutes,
        user
            ? {
                  path: '/',
                  element: <Navigate to="dashboard/inventory-management" />,
              }
            : {
                  path: '/',
                  element: <Navigate to="/user/dashboard/default" />,
              },
        ,
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
