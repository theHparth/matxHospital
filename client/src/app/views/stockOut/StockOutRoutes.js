import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockOutForm = Loadable(lazy(() => import('./AddStockOutForm')))
const AllStockOutDetails = Loadable(lazy(() => import('./AllStockOutDetails')))
const PendingStockOut = Loadable(lazy(() => import('./PendingStockOut')))
const NewAllStockOut = Loadable(lazy(() => import('./NewAllStockOut')))

const wereHouseRoutes = [
    {
        path: '/stockOutForm',
        element: <AddStockOutForm />,
    },
    {
        path: '/listStockOut',
        element: <NewAllStockOut />,
    },
    {
        path: '/pendingStockOut',
        element: <PendingStockOut />,
    },
]

export default wereHouseRoutes
