import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const TodaySellingAddForm = Loadable(
    lazy(() => import('./TodaySellingAddForm'))
)
const AllStockInDetails = Loadable(lazy(() => import('./AllStockInDetails')))
const PendingStockIn = Loadable(lazy(() => import('./PendingStockIn')))
const InstockListUser = Loadable(lazy(() => import('./InstockListUser')))
const PreviousSellingEntryManage = Loadable(
    lazy(() => import('./PreviousSellingEntryManage'))
)

const StockInUserRoutes = [
    {
        path: '/pendingStockInUser',
        element: <PendingStockIn />,
    },
    {
        path: '/inStockUser',
        element: <InstockListUser />,
    },
    {
        path: '/newEntryForm',
        element: <TodaySellingAddForm />,
    },
    {
        path: '/listStockOut',
        element: <PreviousSellingEntryManage />,
    },
    {
        path: '/allReceivedSrtock',
        element: <AllStockInDetails />,
    },
]

export default StockInUserRoutes
