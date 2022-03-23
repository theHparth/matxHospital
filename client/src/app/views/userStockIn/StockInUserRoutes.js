import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const TodaySellingAddForm = Loadable(
    lazy(() => import('./TodaySellingAddForm'))
)
const AllStockInDetails = Loadable(lazy(() => import('./AllStockInDetails')))
const PendingStockIn = Loadable(lazy(() => import('./PendingStockIn')))
const PreviousSellingEntryManage = Loadable(
    lazy(() => import('./PreviousSellingEntryManage'))
)

const StockInUserRoutes = [
    {
        path: '/pendingStockInUser',
        element: <PendingStockIn />,
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
