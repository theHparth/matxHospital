import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const TodaySellingTodayForm = Loadable(
    lazy(() => import('./TodaySellingToday'))
)
const AllStockInDetails = Loadable(lazy(() => import('./AllStockInDetails')))
const PendingStockIn = Loadable(lazy(() => import('./PendingStockIn')))
const EntryMange = Loadable(lazy(() => import('./EntryManage')))

const StockInUserRoutes = [
    {
        path: '/pendingStockInUser',
        element: <PendingStockIn />,
    },
    {
        path: '/newEntryForm',
        element: <TodaySellingTodayForm />,
    },
    {
        path: '/listStockOut',
        element: <EntryMange />,
    },
    {
        path: '/allReceivedSrtock',
        element: <AllStockInDetails />,
    },
]

export default StockInUserRoutes
